
<template>
    <div class="card text flexJustify ">
      <div v-if="showPopup === true ">
                <Popup text="Votre medecin à bien été supprimé" />

      </div>
        <h3 class="card-header">Docteurs</h3>
        <div class="card-body flexWrap p-3 spaceBetween">
            <DoctorCard :id="item.id" v-for="item in pageOfItems" :key="item.id" />    
        </div>
        <div  v-if="isLoading === false" class="card-footer pb-0 pt-3">
            <jw-pagination :items="physicians" @changePage="onChangePage" :pageSize="6"></jw-pagination>
        </div>
    </div>
</template>



 
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
            isLoading:true

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
           this.isLoading = false
       })
    },
     updateParent(showPopup) {
        this.showPopup = showPopup
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
  min-height: 85%;
}

.spaceBetween{
  align-content: space-between;
  justify-content: space-between
}

</style>