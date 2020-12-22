import Phaser, { Physics } from "phaser";
import GameOver from "./gameOver.js"

var velocity,score, direction, snakeBody, addNew, life

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
        this.snakeBody = []
        this.direction = 'right'
        this.new_direction = null
        this.score = 0
        this.velocity = 0
        this.addNew = false
        this.updateDelay = 0
        this.life = 1
        this.snake = this.physics.add.image(200,200,'snakeC')
        this.snake.setCollideWorldBounds(true);
        this.snakeBody[0]= this.snake

        this.cursor = this.input.keyboard.createCursorKeys()

        this.generateApplle()
        this.generatePizza()
        this.textStyle_Key = { font: "bold 14px sans-serif", fill: "#2F4F4F", align: "center" };
        this.textStyle_Value = { font: "bold 18px sans-serif", fill: "#2F4F4F", align: "center" };
        
        this.add.text(30, 20, "SCORE", this.textStyle_Key);
        this.scoreTextValue = this.add.text(90, 18, this.score.toString(), this.textStyle_Value);

        this.add.text(120, 20, "LIFES", this.textStyle_Key);
        this.lifeTextValue = this.add.text(170, 18, this.life.toString(), this.textStyle_Value);
       
    }

    update(){


        if(this.cursor.right.isDown && this.direction!='left'){
            this.direction = 'right'
            /*this.snake.setVelocity(0,0);
            this.snake.setVelocity(this.velocity,0);*/
        }else if (this.cursor.left.isDown && this.direction!='right'){
            this.direction = 'left'
            /*this.snake.setVelocity(0,0);
            this.snake.setVelocity(-this.velocity,0);*/
        }else if (this.cursor.up.isDown && this.direction!='down'){
            this.direction = 'up'
            /*this.snake.setVelocity(0,0);
            this.snake.setVelocity(0,-this.velocity);*/
        }else if (this.cursor.down.isDown && this.direction!='up'){
            this.direction = 'down'
            /*this.snake.setVelocity(0,0);
            this.snake.setVelocity(0,this.velocity);*/
        }

        this.velocity = Math.min(10, Math.floor(this.score/5));
        this.updateDelay++;

        if (this.updateDelay % (10 - this.velocity) == 0) {


            var firstCell = this.snakeBody[this.snakeBody.length - 1],
                lastCell = this.snakeBody.shift(),
                oldLastCellx = lastCell.x,
                oldLastCelly = lastCell.y;

            if(this.new_direction){
                this.direction = this.new_direction;
                this.new_direction = null;
            }

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

            // Place the last cell in the front of the stack.
            // Mark it as the first cell.

            this.snakeBody.push(lastCell);
            firstCell = lastCell;

            // End of snake movement.

            // Increase length of snake if an apple had been eaten.
            // Create a block in the back of the snake with the old position of the previous last block (it has moved now along with the rest of the snake).
            if(this.addNew){
                this.snakeBody.unshift(this.add.sprite(oldLastCellx, oldLastCelly, 'snakeB'));
                this.addNew = false;
            }
            
            this.physics.add.overlap(this.snake, this.damage, this.pizzaOverlap, null, this);
            this.physics.add.overlap(this.snakeBody, this.platforms, this.collectApple, null, this);
            this.physics.add.collider(this.snakeBody, this.obstaculos, this.obstaculeCollision, null, this);
        }

        
        



    }

    generateApplle(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(Math.floor(Math.random() * 60 ) * 16, Math.floor(Math.random() * 10 ) * 16, 'apple');
        this.physics.add.collider(this.platforms);
        this.time.delayedCall(10000, this.generateApplle, [], this);
    }

    generatePizza(){
        this.damage = this.physics.add.staticGroup();
        this.damage.create(Math.floor(Math.random() *60 ) * 16, Math.floor(Math.random() * 10 ) * 16, 'pizza');
        this.physics.add.collider(this.damage);
        this.time.delayedCall(15000, this.generatePizza, [], this);
    }

    generateObstaculo(){
        this.obstaculos = this.physics.add.staticGroup();
        this.obstaculos.create(Math.floor(Math.random() * 60 ) * 16, Math.floor(Math.random() * 10 ) * 16, 'obstaculo');
        this.physics.add.collider(this.snakeBody, this.obstaculos);
    }

    collectApple (snake, apple){      
        apple.disableBody(true, true);
        this.score++
        this.scoreTextValue.text = this.score.toString();
        this.addNew = true

    }

    obstaculeCollision(){

    }

    pizzaOverlap ( snake, pizza){      
        pizza.disableBody(true, true);
        this.life--       
        this.lifeTextValue.text = this.life.toString();
        if(this.life==0){
            this.scene.start("GameOver")
        }
        
    }
 
}

