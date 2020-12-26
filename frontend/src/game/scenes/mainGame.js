import Phaser, { Physics } from "phaser";
import GameOver from "./GameOver"

var velocity,score, direction, snakeBody, addNew

//The structure of the Main game scene
export default class MainGame extends Phaser.Scene{
    constructor(){
        super({key: "MainGame"});
    }

    preload(){
        this.cameras.main.setBackgroundColor("#BFDEDA");
        this.load.image('snakeC', '@/assets/snakeH.jpg')
        this.load.image('pizza', '@/assets/pizza.png')
        this.load.image('apple', '@/assets/apple.png')
        this.load.image('obstaculo', '@/assets/obstaculo.png')
        this.load.image('snakeB', '@/assets/snakeB.png')
    }

    create(){
        this.snakeBody = [] //array of snake parts
        this.direction = 'right' // var that indicate the direction
        this.score = 0 //var that indicate the score of the game
        this.velocity = 0 //var that indicate velocity of the snake
        this.addNew = false  //var that indicate the add of a snake part
        this.updateDelay = 0 //var that indicate the delay for movement
        this.snake = this.physics.add.sprite(200,200,'snakeC')
        this.snake.setCollideWorldBounds(true);
        this.snake.checkWorldBounds = true;
        this.snakeBody[0]= this.snake

        //Init the cursor for keyboard inputs
        this.cursor = this.input.keyboard.createCursorKeys()
       
        
        this.generateApplle()
        this.generatePizza()
        this.textStyle_Key = { font: "bold 14px sans-serif", fill: "#2F4F4F", align: "center" };
        this.textStyle_Value = { font: "bold 18px sans-serif", fill: "#2F4F4F", align: "center" };
        
        //Add the score text in the canvas
        this.add.text(30, 20, "SCORE", this.textStyle_Key);
        this.scoreTextValue = this.add.text(90, 18, this.score.toString(), this.textStyle_Value);     
    }

    update(){

        //Change and avoid that the snake take a direction that can´t take
        if(this.cursor.right.isDown && this.direction!='left'){
            this.direction = 'right'
        }else if (this.cursor.left.isDown && this.direction!='right'){
            this.direction = 'left'
        }else if (this.cursor.up.isDown && this.direction!='down'){
            this.direction = 'up'
        }else if (this.cursor.down.isDown && this.direction!='up'){
            this.direction = 'down'
        }

        //Increment velocity 
        this.velocity = Math.min(10, Math.floor(this.score/5));
        this.updateDelay++;

        //produce delay for the update function, this to make a clear movement of the snake
        if (this.updateDelay % (10 - this.velocity) == 0) {


            var firstCell = this.snakeBody[this.snakeBody.length - 1],
                lastCell = this.snakeBody.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            //struct that move the snake parts 
            if(this.direction == 'right'){

                lastCell.x = firstCell.x + 16;
                lastCell.y = firstCell.y;
            }
            else if(this.direction == 'left'){
                lastCell.x = firstCell.x - 16;
                lastCell.y = firstCell.y;
            }
            else if(this.direction == 'up'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y - 16;
            }
            else if(this.direction == 'down'){
                lastCell.x = firstCell.x;
                lastCell.y = firstCell.y + 16;
            }

            //Add a obstacule every 10 points
            if(this.flag == true){
                this.generateObstaculo()
                this.flag = false
            }

            //Add a snake instance to the end of the array 
            this.snakeBody.push(lastCell);
            firstCell = lastCell;

            //Add a part of the snake behind the last part 
            if(this.addNew){
                this.snake = this.physics.add.sprite(oldLastCellx, oldLastCelly, 'snakeB')
                this.snakeBody.unshift(this.snake);
                this.addNew = false;
            }

            //Sentence that evaluate the interaction between snake and the objets 
            this.physics.add.overlap(this.snake, this.damage, this.pizzaOverlap, null, this);
            this.physics.add.overlap(this.snakeBody, this.platforms, this.collectApple, null, this); 
            this.physics.add.collider(this.snake, this.obstaculos, this.obstaculeCollision, null, this);          
        }
        
         

    }

    //Function that make the instance of the apples
    generateApplle(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(Math.floor(Math.random() *1300), Math.floor(Math.random() * 300 ), 'apple');
        this.physics.add.collider(this.platforms);
        this.time.delayedCall(10000, this.generateApplle, [], this);
    }

    //Function that make the instance of the pizzas
    generatePizza(){
        this.damage = this.physics.add.staticGroup();
        this.damage.create(Math.floor(Math.random() *1300 ), Math.floor(Math.random() * 300 ) , 'pizza');
        this.physics.add.collider(this.damage);
        this.time.delayedCall(20000, this.generatePizza, [], this);
    }

    //Function that make the instance of the obstacles
    generateObstaculo(){
        this.obstaculos = this.physics.add.staticGroup();
        this.obstaculos.create(Math.floor(Math.random() *1300 ), Math.floor(Math.random() * 300 ), 'obstaculo');
    }

    //Function that plus one the score when snake overlap an applpe
    collectApple (snake, apple){      
        apple.disableBody(true, true);
        this.score++
        this.scoreTextValue.text = this.score.toString();
        this.addNew = true
        if(this.score % 10 == 0){
            this.flag = true
        }

    }

    //Function that change the direction of the snake when collide a obstacule
    obstaculeCollision(snake, obstaculo){
        if(this.direction == "left" || this.direction == "right"){
            if(this.snake.x > obstaculo.x){
                this.direction = 'up'
            }else if(this.snake.x < obstaculo.x){
                this.direction = 'down'
            }
        }else{
             if(this.snake.y < obstaculo.y){
                this.direction = 'left'
            }else if(this.snake.y > obstaculo.y){
                this.direction = 'right'
            }
        }
        
    }

    //Function that delete two parts of snake body when snake overlap the pizza
    pizzaOverlap ( snake, pizza){      
        pizza.disableBody(true, true);
        if(this.snakeBody.length > 2){
            this.body1 = this.snakeBody.shift()
            this.body2 = this.snakeBody.shift()
            this.body1.disableBody(true, true);
            this.body2.disableBody(true, true);
            
        }else{
            this.scene.add("GameOver", GameOver)
            this.scene.start("GameOver")
        }
             
    }
 
}

