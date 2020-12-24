<template>
  <div>
    <v-toolbar
      dark
      prominent
      src="@/assets/serpiente.jpg"
    >

      <v-toolbar-title>Snake</v-toolbar-title>

      <v-spacer></v-spacer>
        <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/"> Home</v-tab>
          <v-tab to="/scores">Scores</v-tab>
        </v-tabs>
      </template>
       
    </v-toolbar>
  </div>
</template>

<script>
export default {
  name: 'toolBar'
}
</script>