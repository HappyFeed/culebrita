import Phaser from "phaser";

export default class GameOver extends Phaser.Scene{
    constructor(){
        super({key: "GameOver"});
    }

    preload(){
        this.cameras.main.setBackgroundColor("#FE0000");
        this.load.image('buttonStart', '@/assets/startButton.png')
    }

    create(){
        alert("Game over")
        this.startBtn = this.add.sprite(100, 100, 'buttonStart').setInteractive();
        this.startBtn.on('pointerdown', function (event){
            this.scene.start("Menu")
        }, this)
    
    }

    update(){
       
    }
    

 
}