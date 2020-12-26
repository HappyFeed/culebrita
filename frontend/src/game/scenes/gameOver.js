import Phaser from "phaser";
import Menu from "./Menu"

//The structure of the Game Over scene
export default class GameOver extends Phaser.Scene{
    constructor(){
        super({key: "GameOver"});
    }

    preload(){
        this.cameras.main.setBackgroundColor("#FE0000");
        this.load.image('buttonStart', '@/assets/startButton.png')
    }

    create(){
        //Button to go back to the menu
        this.startBtn = this.add.sprite(662, 164, 'buttonStart').setInteractive();
        this.startBtn.on('pointerdown', function (event){
            this.scene.add("Menu", Menu)
            this.scene.start("Menu")
        }, this)
    
    }

    update(){
       
    }
    

 
}