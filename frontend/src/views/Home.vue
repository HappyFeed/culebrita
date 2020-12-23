<template>
  <div class="home">
    <v-main class="mx-auto  justify-center">
      <GameC></GameC> 
    </v-main> 
  </div>
</template>

<script>

import GameC from "@/components/CulebritaGame.vue"

export default {
  name: 'Home',
  components: {
    GameC
  }
}
</script>
