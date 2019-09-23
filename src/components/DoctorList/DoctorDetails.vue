
  <template>
  <div class='row '>
      <div class=" card col-md-6 p6">
          <p>
            <b>Nom:</b>{{ physician.firstName }}  <b>Prénom:</b>{{ physician.lastName }} <b>Age:</b>{{ physician.age }}
          </p>

          <p>
            <b>Adresse:</b>{{ addressData.door }} {{ addressData.street }} {{ addressData.city }} {{ addressData.country }}
          </p>
          <p>
            <b>Specialité:</b> {{ specialityData.label }}
          </p>

          <p v-on:click="showPopupC" class="btn btn-primary">Modifier</p>
                </div>

      <div v-if="showPopup ==true" >
      <div class="col-md-12  flexCenter">
                     <h1 >Modifier le docteur </h1>

      </div>
        <DoctorPopupModification :id="id"/>
      </div>
      <div v-else class="col-md-6">
         <h1> Cliquez sur modifier pour accéder à la modification docteur </h1>
      </div>

  
  </div>

</template>

<script>
import Fetch from '../classes/Fetch.js';
import DoctorPopupModification from './DoctorPopupModification.vue'
export default {
  name: 'DoctorDetails',

  components:{
   DoctorPopupModification, 
  },

  data(){
        return {
             physician: undefined,
             addressData: undefined,
             specialityData: undefined,
             showPopup:false,
        }
  },
    
  props: ["id"],  

  methods:{
   getPhysicianData(){
       Fetch.get("http://localhost:3000/physicians/" + this.id)
       .then(data => {
           console.log(data)
           var fetches = []
            fetches.push(fetch("http://localhost:3000/addresses/" + data.addressId))
            fetches.push(fetch("http://localhost:3000/specialities/" + data.specialityId))

            Promise.all(fetches)
            .then((results) => {
                var jsons = [];
                results.forEach(function (item) {
                    if (item.ok) {
                        jsons.push(item.json());
                    } else {
                        throw new Error("An error occurred while trying to fetch the data.");
                    }
                })
                return Promise.all(jsons);
            })
            .then(dataFetches => {
                       this.physician=data,
                         this.addressData=dataFetches[0],
                            this.specialityData=dataFetches[1]
                                    console.log(dataFetches)

                    })
            })
    },

     showPopupC(){
     console.log("showPopup")
     this.showPopup = true
   },

   },

    mounted(){
      this.getPhysicianData()
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