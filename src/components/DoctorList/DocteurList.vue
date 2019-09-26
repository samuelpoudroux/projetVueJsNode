
<template>
    <div class="card text flexJustify ">
      <div v-if="showPopup === true ">
                <Popup text="Votre medecin à bien été supprimé" />
      </div>
      <div class="card-header center">
       <h3 >Docteurs</h3>
       <input placeholder="rechercher"  @input="handleChange" />
      </div>
       
        <div class="card-body flexWrap p-3 spaceBetween">
            <DoctorCard :id="item.id" v-for="item in pageOfItems" :key="item.id" @showPopup="updateParent" />    
        </div>
        <div  v-if="isLoading === false" class="card-footer pb-0 pt-3">
            <jw-pagination :items="physicians" @changePage="onChangePage" :pageSize="6"></jw-pagination>
        </div>
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
             showPopup:false,
            pageOfItems: [],
            isLoading:true,
        }
  },
    
  components : {
    DoctorCard, Popup
  },   

  methods:{
   getAllPhysician(){
        Fetch.get("http://localhost:3000/physicians/")
       .then(data => {
           this.pageOfItems = data
           this.isLoading = false
       })
    },

     updateParent(showPopup) {
        this.showPopup = showPopup
    },

    handleChange(e){
      if(e.target.value === "") {
       this.getAllPhysician()
      } else {
          Fetch.get("http://localhost:3000/physicians/name/" + e.target.value)
          .then(data => {
            this.isLoading = false,
            this.pageOfItems = data
       })
      } 
    }, 

    onChangePage(pageOfItems) {
            // update page of items
            this.pageOfItems = pageOfItems;
        }
   },

    mounted(){
       this.getAllPhysician()
   }  , 
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

.flexJustify{
    height: 100%;
}

.spaceBetween{
  align-content: space-between;
  justify-content: space-between
}

</style>