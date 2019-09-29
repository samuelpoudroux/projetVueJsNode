
  <template>
  <div class='row '>
      <div class=" card col-md-6 p6">
          <p>
            <b>Nom:</b>{{ patient.firstName }}  <b>Prénom:</b>{{ patient.lastName }} <b>Age:</b>{{ patient.age }}
          </p>

          <p>
            <b>Adresse:</b>{{ addressData.door }} {{ addressData.street }} {{ addressData.city }} {{ addressData.country }}
          </p>

          <p v-on:click="showPopupC" class="btn btn-primary">Modifier</p>
                </div>

      <div v-if="showPopup ==true" >
      <div class="col-md-12  flexCenter">
                <h1 >Modifier le Patient </h1>

      </div>
        <PatientPopupModification :id="id"/>
      </div>
      <div v-else class="col-md-6">
         <h1> Cliquez sur modifier pour accéder à la modification du patient</h1>
      </div>
  </div>

</template>

<script>
import Fetch from '../classes/Fetch.js';
import PatientPopupModification from './PatientPopupModification.vue'
export default {
  name: 'PatientDetails',

  components:{
   PatientPopupModification, 
  },

  data(){
        return {
             patient: undefined,
             addressData: undefined,
             showPopup:false,
        }
  },
    
  props: ["id"],  

  methods:{
   getPatientData(){
       Fetch.get("http://localhost:3000/patients/" + this.id)
       .then(data => {
           console.log(data)
           var fetches = []
            fetches.push(fetch("http://localhost:3000/addresses/" + data.addressId))
            Promise.all(fetches)
            .then((results) => {
                var jsons = [];
                results.forEach(function (item) {
                    if (item.ok) {
                         jsons.push(item.text());
                    } else {
                        throw new Error("An error occurred while trying to fetch the data.");
                    }
                })
                return Promise.all(jsons);
            })
            .then(dataFetches => {
                let dataTreated = []
                 dataFetches.forEach(e => {
                            if (e.length > 0) {
                                dataTreated.push(JSON.parse(e))
                            } else {
                                dataTreated.push(null)
                            }

                            console.log(dataTreated)
                       this.patient=data,
                         this.addressData=dataTreated[0] ? dataTreated[0] : undefined

                    })
            })
       })
    },

     showPopupC(){
     console.log("showPopup")
     this.showPopup = true
   },

   },

    mounted(){
      this.getPatientData()
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

.card {
      height: 70%;
      padding: 3%;

}

.row{
  padding: 1%;
  justify-content: center;
  align-items: center;
    height: 90%

}

.flexCenter{
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
}

.h1{
  text-align: center;
}
</style>