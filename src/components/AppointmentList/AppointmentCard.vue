
  <template>
    <div class="card col-lg-6">
      <div class="card-body">
        <h5 class="card-title">Rendez-vous  {{ new Date (appointment.meetingDate).toLocaleDateString() }}</h5>


<div class="container">
  <div class="row">
    <div class="col">
               <h4  class="card-text">Medecin</h4>
 <p v-if="isLoaded === false">{{ physician.firstName}} {{ physician.lastName}}   </p>
     <span  class="card-text">Specialité:</span>  {{ speciality.label}}
    </div>
    <div class="col">
                   <h4  class="card-text">Patient</h4>
            <p v-if="isLoaded === false">{{ patient.firstName}} {{ patient.lastName}} </p>
 <h5>
                 Sujet du rdv
              </h5>

              <p>
                 {{ appointment.meetingName }}
              </p>
    
    </div>
  </div>
</div>






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
            appointment: null,
            physician: null,
            patient: null,
            isLoaded: true,
            speciality: null
        }
  },
    
    props: ['id'],  

  components : {
    },   

   methods:{
       getAppointment(){
        Fetch.get("http://localhost:3000/appointments/" + this.id )
       .then(data => {
         console.log(data)
           this.appointment = data,
           this.getPatientData(data.patientId)
            this.getPhysicianData(data.physicianId)
        this.isLoaded= false
       })
    },

    getPatientData(id){
Fetch.get("http://localhost:3000/patients/" + id )
       .then(data => {
           this.patient= data
       })
    },

    getPhysicianData(id){
Fetch.get("http://localhost:3000/physicians/" + id )
       .then(data => {
           this.physician = data
           Fetch.get("http://localhost:3000/specialities/" + data.specialityId )
           .then(speciality => {
             this.speciality = speciality
           })
       })
    },

    deleteCard(){
      Fetch.delete("http://localhost:3000/appointments/" + this.id )
      .then(deleteData => {
        this.$emit('showPopup', true)
      })
    }
   },
   

    mounted(){
       this.getAppointment()
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

.verticalLine {
  border-left: thick solid #ff0000;
}

</style>