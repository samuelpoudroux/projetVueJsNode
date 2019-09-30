
<template>
    <div class="card text flexJustify ">
      <div v-if="showPopup === true ">
                <Popup text="Votre medecin à bien été supprimé" />
      </div>
      <div class="card-header center">
       <h3 class='' >RENDEZ-VOUS</h3>
         <sui-input placeholder="Rechercher..." v-if='loading === true' loading icon-position="right" v-model="search" />
                  <sui-input placeholder="Rechercher..." v-else icon-position="right" v-model="search" />
      </div>
       
        <div class="card-body flexWrap p-3 spaceBetween">
        <div class=" loader" v-if="isLoading !== false" > 
                    <Loader class=""></Loader>

        </div>
            <AppointmentCard :id="item.id" v-for="item in pageOfItems" :key="item.id" @showPopup="updateParent"/>  
        </div>
        <div  v-if="isLoading === false" class="card-footer text-center">
            <jw-pagination :items="appointments" @changePage="onChangePage" :pageSize="6"></jw-pagination>
        </div>

    </div>
</template>

<script>

import Fetch from '../classes/Fetch.js';
import AppointmentCard from './AppointmentCard.vue';
import Loader from '../../components/ReusableComponent/Loader.vue';

import Popup from '../Popup.vue'

export default {
  name: 'AppointmentList',

  data(){
        return {
            appointments: null,
             showPopup:false,
            pageOfItems: [],
            isLoading:true,
            search:"",
            loading: false,
        }
  },
    
  components : {
    AppointmentCard, Popup, Loader
  },   

  methods:{
   getAllAppointment(){
        Fetch.get("http://localhost:3000/appointments")
       .then(data => {
         console.log(data)
           this.appointments = data
           this.isLoading = false
       })
    },

     updateParent(showPopup) {
        this.showPopup = showPopup
    },

    handleChange(search){
      if(this.search === "") {
       this.getAllAppointment()
      } else {
        this.loading = true
          Fetch.get("http://localhost:3000/appointments/firstname/" + search)
          .then(data => {
            this.isLoading = false,
            this.loading = false,
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
       this.getAllAppointment()
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