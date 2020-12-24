<template>
  <div class="home">
    <v-main>
      <v-row>
        <GameC></GameC>
      </v-row>
      <v-row>
        <FormSave></FormSave>
      </v-row>  
    </v-main> 
  </div>
</template>

<script>

import GameC from "@/components/CulebritaGame.vue"
import FormSave from "@/components/FormS.vue"

export default {
  name: 'Home',
  components: {
    GameC,
    FormSave
  }
}
</script>
