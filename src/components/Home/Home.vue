
<template>
  <div id='home'>
    <div>
home    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
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

} 

</script>

<style scoped>
 .home{
   width: auto
 }
</style>