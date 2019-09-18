

<template>
  <div id='hello'>
    <div>
      <h1 class='display-3'>personLIst</h1>
      <ul id="hello">
         <li v-bind:key='index' v-for="(person, index) in persons">
             {{ person.name }} {{ person.lastName }} 
         </li>
         <Button v-on:click='showPopup' >Poster une nouvelle person</Button>
</ul>
          <postPerson :visible='visible' ></postPerson> 

    </div>
  </div>
</template>

<script>
import PostPerson from './postPerson.vue'
export default {
  name: 'hello',
    data ()  {
      return {
      persons : [
          {name: 'Foo' },
          {name: 'Bar' }
      ],
        newPerson : {
          name:null,
          firstname:null
        },

        visible:false
    }
  },
  methods:{
    getPersonsData(){
      fetch('http://localhost:3000/persons')
      .then(response => {
         return response.json();
      }).then(
        data => {
          console.log(data.results)
          this.persons=data.results
        }
      )
   },

   showPopup(){
     console.log("aa")
     this.visible=true
   }
  },
  mounted(){
    this.getPersonsData()
  },

  components: {
    PostPerson
  }
} 

</script>

<style>
  .hero {
    height: 90vh;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .hero .lead {
    font-weight: 200;
    font-size: 1.5rem;
  }
</style>