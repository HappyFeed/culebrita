<template>
  <div>
    <v-container class="grey lighten-5 mb-6" elevation="2">
      <v-row class="d-flex justify-center mb-6">
        <h1>Save your Score</h1>
      </v-row>
      <v-row class="d-flex justify-center mb-6" width="800">
        <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <validation-provider
            v-slot="{ errors }"
            name="Name"
            rules="required|max:50"
          >
          <v-text-field
            v-model="name"
            :counter="50"
            :error-messages="errors"
            label="Username"
            required
            
          ></v-text-field>
          </validation-provider>
          <validation-provider
            v-slot="{ errors }"
            score="Score"
            rules="required|max:3"
          >
          <v-text-field
            v-model="score"
            :counter="3"
            :error-messages="errors"
            label="Score"
            required
          ></v-text-field>
          </validation-provider>
          <v-btn
            class="mr-4"
            type="submit"
            :disabled="invalid"
          >
            submit
          </v-btn>
          <v-btn @click="clear" >
          clear
          </v-btn>
        </form>
        </validation-observer>  
      </v-row>
      
    </v-container>
    
  </div>
 
</template>

<script>
  import { required, digits, email, max, regex } from 'vee-validate/dist/rules'
  import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
  import axios from 'axios'

  setInteractionMode('eager')

  extend('digits', {
    ...digits,
    message: '{_field_} needs to be {length} digits. ({_value_})',
  })

  extend('required', {
    ...required,
    message: '{_field_} can not be empty',
  })

  extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters',
  })

  extend('regex', {
    ...regex,
    message: '{_field_} {_value_} does not match {regex}',
  })


  export default {
    components: {
      ValidationProvider,
      ValidationObserver,
    },
    data: () => ({
      name: '', //name of the user
      score: '', //score of the user
    }),

    methods: {
      submit () {
        this.$refs.observer.validate()
        let json ={
          "Name" : this.name, "Score" : this.score
        }
        //function that send the data to the server 
        axios({ method: "POST", url: 'http://localhost:9080/save',headers: {"content-type": "text/plain"}, data: json  })
        .then( data =>{
          console.log(data);
        })
      },
      clear () {
        this.name = '',
        this.score = ''
      },
      },
  }
</script>