
  <template>
    <div class="card col-lg-5">
      <div class="card-body">
        <h5 class="card-title">Patient numéro {{ patient.id}}</h5>
        <p v-if="isLoaded === false" class="card-text">{{ patient.firstName}} {{ patient.lastName}} </p>
            <sui-button basic primary v-on:click="goDetailCard">Details</sui-button>
    <sui-button  v-on:click="deleteCard" basic negative>Supprimer</sui-button>
      </div>
    </div>
</template>

<script>
import Fetch from '../classes/Fetch.js';
import Router from 'vue-router'


export default {
  name: 'PatientCard',
  data(){
        return {
            patient: null,
            isLoaded: true
        }
  },
    
    props: ['id'],  

  components : {
    },   

   methods:{
       getpatient(){
      Fetch.get("http://localhost:3000/patients/" + this.id )
       .then(data => {
           this.patient = data,
        this.isLoaded= false
       })
    },
      goDetailCard(){
        this.$router.push({ name: 'patientDetails', params: {id: this.id }})
    },

    deleteCard(){
      Fetch.delete("http://localhost:3000/patients/" + this.id )
      .then(deleteData => {
        this.$emit('showPopup', true)
      })
    }
   },
   

    mounted(){
       this.getpatient()
   }  
} 


</script>


<style scoped>

.container-fluid{
  display: flex;
  flex-direction: row;
  background: blue;
}


.center{
  display: flex;
  flex-flow: row wrap;
padding: 1%;
  justify-content: space-between
}


.border-style {
  border-radius: 57px 54px 54px 54px;
-moz-border-radius: 57px 54px 54px 54px;
-webkit-border-radius: 57px 54px 54px 54px;
border: 7px solid #49484869;
padding: 1%
}

</style>