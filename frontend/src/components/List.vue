<template> 
<div class="listaScores">
   
    <v-container  class="grey lighten-5 mb-6" border="left" colored-border color="deep-purple accent-4" elevation="2">
        <v-row class="d-flex justify-center mb-6">
            <h1>Hall of fame</h1>
        </v-row>
        <v-row class="d-flex justify-center mb-6">
            <template>
                <v-card class="mx-auto" max-width="300" tile>
                    <v-list disabled>
                        <v-list-item-group v-model="selectedItem" color="primary">
                            <v-list-item v-for="(item, i) in items" :key="i">
                                <v-list-item-icon>
                                    <v-icon v-text="item.icon"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.text"></v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card>
            </template>
        </v-row>
        
    </v-container>
    
     
</div>
</template>
<script>
    import axios from 'axios'

    export default {
    data: () => ({
      selectedItem: 1,
      items: [
        { text: 'Real-Time', icon: 'mdi-clock' },
        { text: 'Audience', icon: 'mdi-account' },
        { text: 'Conversions', icon: 'mdi-flag' },
      ],
      alignments: [
        'start',
        'center',
        'end',
      ],
    }),
    methods:{
        async getDolar(){
            let datos = await axios.get('http://localhost:9080/scores')
            console.log(datos);
        }
    },
  }
</script>