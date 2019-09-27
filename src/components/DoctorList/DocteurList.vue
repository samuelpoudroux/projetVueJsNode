
<template>
    <div class="card text flexJustify ">
      <div v-if="showPopup === true ">
                <Popup text="Votre medecin à bien été supprimé" />
      </div>
      <div class="card-header center">
       <h3 class='' >Docteurs</h3>
         <sui-input placeholder="Rechercher..." loading icon-position="right" v-model="search" />
      </div>
       
        <div class="card-body flexWrap p-3 spaceBetween">
        <div class=" loader" v-if="isLoading !== false" > 
                    <Loader class=""></Loader>

        </div>
            <DoctorCard :id="item.id" v-for="item in pageOfItems" :key="item.id" @showPopup="updateParent" />    
        </div>
        <div  v-if="isLoading === false" class="card-footer text-center">
            <jw-pagination :items="physicians" @changePage="onChangePage" :pageSize="6"></jw-pagination>
        </div>
    </div>
</template>

<script>

import Fetch from '../classes/Fetch.js';
import DoctorCard from './DoctorCard.vue';
import Loader from '../../components/ReusableComponent/Loader.vue';

import Popup from '../Popup.vue'

export default {
  name: 'DoctorList',

  data(){
        return {
             physicians: undefined,
             showPopup:false,
            pageOfItems: [],
            isLoading:true,
            search:null,
        }
  },
    
  components : {
    DoctorCard, Popup, Loader
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

    handleChange(search){
      if(this.search === "") {
       this.getAllPhysician()
      } else {
          Fetch.get("http://localhost:3000/physicians/name/" + search)
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
   }, 

    watch: {
  'search': function() {
this.handleChange(this.search)
 }
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

.flexJustify{
    height: 100%;
}

.spaceBetween{
  align-content: space-between;
  justify-content: space-between
}

input,
select {
    border: none;
    border-bottom: 2px solid grey;
    background: none;
    
}

.loader{
  height: 100%;
  width:100%;
  display: flex;
  justify-content: center;
  align-content: center
}

.ui.segment{
  width: 100%
}



</style>