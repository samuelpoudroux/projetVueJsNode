 
 <template>
        <form v-show="visible" method="post" action="traitement.php">
            <label for="name">Entrez un Nom : </label>
            <input v-on:change="onChange" v-bind="personData.name" type="text" name="name" id="name"><br><br>
            <label for="firstName">firstName: </label>
            <input  v-on:change="onChange" v-bind="personData.firstName" type="text" name="firstName" id="firstName"><br><br>     
            <button v-on:click.prevent="postPerson" value="Envoyer">Envoyers</button> 
        </form>
</template>

<script>

export default {
  name: 'PostPerson',
    data ()  {
      return {
        personData : {
          name:null,
          firstName:null
        }
    }
  },
   props: [
    'visible'
   ],

  methods:{
      onChange(e){
          this.personData[e.target.name] = e.target.value
          console.log(this.personData)
    },
   postPerson(e){
     let personData = this.personData
     console.log(this.personData)
     fetch('http://localhost:3000/persons', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        personData
    })
});
   }

  },
} 

</script>