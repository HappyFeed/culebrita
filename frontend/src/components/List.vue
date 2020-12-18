<template> 
<div class="listaScores">
   
    <v-container  class="grey lighten-5 mb-6" border="left" colored-border color="deep-purple accent-4" elevation="2">
        <v-row class="d-flex justify-center mb-6">
            <h1>Hall of fame</h1>
        </v-row>
        <v-row class="d-flex justify-center mb-2" >
            <template>
                <v-card class="mx-auto  justify-center" max-width="1000" tile outlined color="green" width="1000" >
                    <v-list disabled>
                        <v-list-item-group v-model="selectedItem" color="primary">
                            <v-list-item v-for="(item, i) in arrayOrdenado" :key="i">
                                <v-list-item-content>
                                    <v-list-item-title >{{(i+1)}}</v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.Name" color="green"></v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.Score"></v-list-item-title>
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
    
      items: [],

      alignments: [
        'start',
        'center',
        'end',
      ],
    }),
    methods:{
        async getScores(){
            let datos = await axios.get('http://localhost:9080/scores')
            this.items= await datos.data.data
        }
    },
    computed:{
        arrayOrdenado(){
            return this.items.sort((a,b) => b.Score - a.Score)
        }
    },
    created() {
        this.getScores()
    },

  }
</script>