<template>
  <div class="home">
    <h1>Hello home</h1>
    <GameC></GameC>
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
