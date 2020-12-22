import Phaser from "phaser"
import Menu from "./scenes/menu"

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
            Menu,
        ],
        width: "100%",
        height: "200%",
                    
    })
}

export default launch;
export {launch}