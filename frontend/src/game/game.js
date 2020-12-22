import Phaser from "phaser"
import Menu from "./scenes/menu"
import GameOver from "./scenes/gameOver"
import MainGame from "./scenes/mainGame"

function launch(containerId){
    return new Phaser.Game({       
        type: Phaser.AUTO,
        parent: containerId,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    
                 },
            }
        },
        scene: [
            Menu, GameOver, MainGame
        ],
        scale:{
            autoCenter: Phaser.Scale.CENTER_BOTH,
            width: "80",
            height: "80",
        }

                    
    })
}

export default launch;
export {launch}