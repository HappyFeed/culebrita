<template>
<div id= "canvasParent">
    <ion-phaser v-bind:game.prop='gameInstance'/>  
</div>
</template>
<script>
//import * as GameConfig from "@/game/game.js"

export default {
  name: 'HelloWorld',
  data() {
    return {
      gameInstance : null
    }  
  },

  //method that asyncronic import the instance of the game
  async mounted(){
    const GameConfig = await import("@/game/game.js") 
    this.$nextTick(() =>{
      
      this.gameInstance = GameConfig.config
    })
    
  }
}  
</script>