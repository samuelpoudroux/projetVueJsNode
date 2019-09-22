
  <template>
  <div>
  <p>
    <b>Nom:</b>{{ physician.firstName }}  <b>Prénom:</b>{{ physician.lastName }} <b>aGE:</b>{{ physician.age }}
  </p>

  <p>
    <b>Adresse:</b>{{ addressData.door }} {{ addressData.street }} {{ addressData.city }} {{ addressData.country }}
  </p>
  <p>
    <b>Specialité:</b> {{ specialityData.label }}
  </p>
  </div>

</template>

<script>
import Fetch from '../classes/Fetch.js';
export default {
  name: 'DoctorDetails',

  data(){
        return {
             physician: undefined,
             addressData: undefined,
             specialityData: undefined,
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
    }
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

</style>