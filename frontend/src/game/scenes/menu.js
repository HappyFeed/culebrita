import Phaser from "phaser";

export default class Menu extends Phaser.Scene{
    constructor(){
        super({key: "Menu"});
    }

    preload(){
        this.cameras.main.setBackgroundColor("#B5E742");
        this.load.image('buttonStart', '@/assets/startButton.png')
    }

    create(){
        this.startBtn = this.add.sprite(662, 164, 'buttonStart').setInteractive();
        this.startBtn.on('pointerdown', function (event){
            this.scene.start("MainGame")
        }, this)
    
    }

    update(){
       
    }
    

 
}