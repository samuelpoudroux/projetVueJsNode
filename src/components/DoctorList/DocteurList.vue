
  <template>
  <div class= 'flexWrap'>
      <div v-if="showPopup === true ">
      <Popup text="Votre medecin à bien été supprimé" />
      </div>
  <DoctorCard class="blog-item" v-for="physician in physicians" :key="physician" :id="physician.id" @showPopup="updateParent" >
</DoctorCard>
  </div>

</template>

<script>
import Fetch from '../classes/Fetch.js';
import DoctorCard from './DoctorCard.vue';
import Popup from '../Popup.vue'

export default {
  name: 'DoctorList',

  data(){
        return {
             physicians: undefined,
             showPopup:false
        }
  },
    
  components : {
    DoctorCard, Popup
  },   

  methods:{
   getAllPhysician(){
       Fetch.get("http://localhost:3000/physicians/")
       .then(data => {
           this.physicians = data
       })
    },
     updateParent(showPopup) {
        this.showPopup = showPopup
    }
   },

    mounted(){
       this.getAllPhysician()
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
 
padding: 1%
}

.flexWrap {
  display: flex;
  flex-direction: row; 
  flex-flow: row wrap;
  justify-content: space-between

}

</style>