import Phaser from "phaser";
import Menu from "./scenes/Menu"
import GameOver from "./scenes/GameOver"
import MainGame from "./scenes/MainGame"

//The configuration of a game with phaser
export const config = {
    scene: [ GameOver, MainGame, Menu],
    scale:{
        width: "100",
        height: "50",
    }, 
    type: Phaser.AUTO,
    parent: "canvasParent", 
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                        
            },
        }
    },
        
}

