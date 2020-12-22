<template>
  <div id= idPlace class="d-flex justify-center mb-6" elevation="2">

  </div>
</template>
<script>
import Phaser from "phaser";

export default {
  name: 'HelloWorld',
  data() {
    return {
      idPlace : "gamePlace",
      gameInstance : null
    };
  },
  async mounted(){
    const game = await import("@/game/game.js")
    this.$nextTick( ()=>{
      this.gameInstance = game.launch(this.idPlace)
    })
  },
  destroyed(){
    this.gameInstance.destroy(false)
  }
}; 
</script>