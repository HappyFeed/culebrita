<template>
  <v-app>
    <toolBar>  </toolBar>
      <v-content>
        <v-container fluid>
          <v-fade-transition mode="out-in">
            <router-view></router-view>
          </v-fade-transition>
        </v-container>
      </v-content>  
    
  </v-app>

</template>

<script>

import toolBar from "@/components/ToolBar.vue"

export default {
  name: 'App',

  components: {
    toolBar
  },

  data: () => ({
    //
  }),
};
</script>
