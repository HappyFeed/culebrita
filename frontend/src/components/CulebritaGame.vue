<template>
<div>
    <v-main >
    <div >
          <ion-phaser v-bind:game.prop='gameInstance'/>
    </div>
  </v-main>
</div>
</template>
<script>
import Phaser from "phaser";
import Menu from "@/game/scenes/Menu.js"
import GameOver from "@/game/scenes/GameOver.js"
import MainGame from "@/game/scenes/MainGame.js"

export default {
  name: 'HelloWorld',
  data() {
    return {
      idPlace : "gamePlace",
      gameInstance : {   
        scale:{
            width: "100",
            height: "50",
        }, 
        type: Phaser.AUTO,     
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {
                    
                 },
            }
        },
        scene: [ Menu, GameOver, MainGame],
        
      }
    }  
  }
}  
</script>