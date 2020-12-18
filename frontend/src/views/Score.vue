<template>
  <div class="score">
    <v-main>
      <scoreList></scoreList>
    </v-main> 
  </div>
</template>

<script>

import scoreList from "@/components/List.vue"

export default {
  name:"Score",
  components:{
    scoreList
  }
}
</script>