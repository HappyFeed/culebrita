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
import * as GameConfig from "@/game/game.js"

export default {
  name: 'HelloWorld',
  data() {
    return {
      gameInstance : GameConfig.config
    }  
  },
}  
</script>