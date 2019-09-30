<template>
  <div id="app">
    <div style="padding: 10px;">
    </div>
    <div class="color-header">
      <sui-input class='ml-5' placeholder="Rechercher..." icon-position="right" v-model="search"  />
    </div>
    <grid
      :center="false"
      :draggable="true"
      :sortable="true"
      :items="physicians"
      :height="80"
      :width="80"
      :cellWidth="300"
      @change="change"
      @remove="remove"
      @click="click"
      @sort="sort">
      <template slot="cell" scope="props">
      <div class='ml-5'>
            <Dam :id="props.item.id" :key="props.item.id" @showPopup="updateParent" />
</div>

      </template>
    </grid>
    
<!--
    <grid
      :center="false"
      :draggable="true"
      :sortable="true"
      :items="items"
      @change="change"
      @remove="remove"
      @sort="sort">
      <template slot="cell" scope="scope">
        <Icon :index="scope.index">
          {{scope.index}} / {{scope.sort}}
        </Icon>
      </template>
    </grid>
-->
  </div>

</template>


<script>
import Dam from './DoctorList/DoctorCard.vue'
import Fetch from './classes/Fetch.js';

export default {
  name: 'drag',
  components: {
    Dam
  },
  data () {
    return {
      physicians:[{"name": "ss"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"},{"name": "saaa"}],
      selected: null,
      isLoading:true,
            search:"",
            loading: false,
    }
  },
  mounted () {
   this.getAllPhysician()
  },

  methods: {
    click ({ items, index }) {
      let value = items.find(v => v.index === index)
      this.selected = value.item
      console.log(this.selected)
    },
    change (event) {
      console.log('change', event)
    },
    remove (event) {
      console.log('remove', event)
    },
    sort (event) {
      console.log('sort', event)
    },


      getAllPhysician(){
        Fetch.get("http://localhost:3000/physicians/")
       .then(data => {
         console.log(data)
           this.physicians = data
       })
    },
       handleChange(search){
      if(this.search === "") {
       this.getAllPhysician()
      } else {
        this.loading === true
          Fetch.get("http://localhost:3000/physicians/name/" + search)
          .then(data => {
            this.isLoading = false,
            this.loading = false
            this.physicians = data
       })
      } 
    }, 
  },
     watch: {
  'search': function() {
this.handleChange(this.search)
 }
    }
}
</script>

<style lang="css">
body {
  background: #fafafa;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.color-header {
  position: relative;
  padding: 10px 0;
  box-sizing: border-box;
}

.red{
  background:red
}


</style>