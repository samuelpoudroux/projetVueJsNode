 
<template>
    <b class="bv-example-row">
            <yan-progress :total="100" :done="done" :modify="30" />
                  <div class='mt-3 center'>
                    <b-col md='6' sm='12' class='patientList'>
                    <PatientList/>
                    </b-col>
                    <b-col md='6' sm='12' class='doctorForm border-style'>
                    <PatientPopupCreation @updateProgressBar="updateBarProgess"/>
                    </b-col>
                  </div>
            </b>
</template>

<script>
import PatientPopupCreation from './PatientPopupCreation'
import PatientList from './PatientList'

export default {

  data (){
    return {
      done:0
    }
  },
    name: 'PatientComponent',

    components: {
       PatientPopupCreation,
        PatientList
    },

    methods: {
        updateBarProgess(done) {
          this.done = done
        }
    },
}
</script>


<style scoped>
.container-fluid {
    display: flex;
    flex-direction: row;
    background: blue;
}

.doctorForm {}

.patientList {}

.center {
    display: flex;
    flex-flow: row wrap;
    padding: 1%;
    justify-content: space-between
}

.border-style {
    border-radius: 57px 54px 54px 54px;
    -moz-border-radius: 57px 54px 54px 54px;
    -webkit-border-radius: 57px 54px 54px 54px;
}
</style>