 
 <template>
        <b class="bv-example-row">
              <div class='mt-3 center'>
                <b-col md='7' sm='12' class='doctorList border-style'>2 of 3
                
                </b-col>
                <b-col md='3' sm='12' class='doctorForm border-style'>
                <DoctorPopupCreation/>
                </b-col>
              </div>
        </b>
</template>

<script>
import DoctorPopupCreation from './DoctorPopupCreation.vue'
export default {
  name: 'DoctorComponent',
    
  components : {
      DoctorPopupCreation,
    },   

  methods:{
   postPerson(e){
     let personData = this.personData
     console.log(this.personData)
     fetch('http://localhost:3000/persons', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        personData
    })
});
   }

  },
} 

</script>


<style scoped>

.container-fluid{
  display: flex;
  flex-direction: row;
  background: blue;
}

.doctorForm{


}

.doctorList{


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