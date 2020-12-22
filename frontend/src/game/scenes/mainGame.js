import Phaser, { Physics } from "phaser";

var velocity,score

export default class MainGame extends Phaser.Scene{
    constructor(){
        super({key: "MainGame"});
    }

    preload(){
        this.cameras.main.setBackgroundColor("#BFDEDA");
        this.load.image('snakeC', '@/assets/serpiente.jpg')
        this.load.image('pizza', '@/assets/pizza.png')
        this.load.image('apple', '@/assets/apple.png')
    }

    create(){
        this.score = 0
        this.velocity = 40
        this.snake = this.physics.add.image(200,200,'snakeC')
        this.snake.setCollideWorldBounds(true);

        this.cursor = this.input.keyboard.createCursorKeys()

        this.generateApplle()
        this.textStyle_Key = { font: "bold 14px sans-serif", fill: "#2F4F4F", align: "center" };
        this.textStyle_Value = { font: "bold 18px sans-serif", fill: "#2F4F4F", align: "center" };
        
        this.add.text(30, 20, "SCORE", this.textStyle_Key);
        this.scoreTextValue = this.add.text(90, 18, this.score.toString(), this.textStyle_Value);
       
    }

    update(){


        if(this.cursor.right.isDown){
            this.snake.setVelocity(0,0);
            this.snake.setVelocity(this.velocity,0);
        }else if (this.cursor.left.isDown){
            this.snake.setVelocity(0,0);
            this.snake.setVelocity(-this.velocity,0);
        }else if (this.cursor.up.isDown){
            this.snake.setVelocity(0,0);
            this.snake.setVelocity(0,-this.velocity);
        }else if (this.cursor.down.isDown){
            this.snake.setVelocity(0,0);
            this.snake.setVelocity(0,this.velocity);
        }

        this.physics.add.overlap(this.snake, this.platforms, this.collectApple, null, this);
        
        



    }

    generateApplle(){
        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(Math.floor(Math.random() * 60 ) * 16, Math.floor(Math.random() * 10 ) * 16, 'apple');
        this.physics.add.collider(this.platforms);
        this.time.delayedCall(20000, this.generateApplle, [], this);
    }

    collectApple (snake, apple){
        apple.disableBody(true, true);
        this.velocity = this.velocity + 10
        this.score = this.score +10
        this.scoreTextValue.text = this.score.toString();
       
    }
 
}

