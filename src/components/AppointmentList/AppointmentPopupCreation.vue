
<template>
    <div class="card">
        <h4 class=" card-header text-center">Ajouter un Rendez-vous</h4>
        <b-form class='center'>
            <div v-if="showPopup === true ">
                <Popup text="Votre RDV à bien été créé" />
            </div>
                <div class='row p-3'>
                   <b-form-group class='form col-md-6' id="input-group-1" label="Nom du rdv:" label-for="input-1" description="">
                        <b-form-input id="apppointmentInput" v-model.trim="$v.meetingName.$model" :class="{
                          'is-invalid' :$v.meetingName.$error, 'is-valid' : !$v.meetingName.$invalid }" type="text" v-on:blur="checkCompleted" name="meetingName"  placeholder="Nom"></b-form-input>
                          <b class="valid-feedback">Votre nom est valide</b>
                        <b class="invalid-feedback">
                        <span v-if="!$v.meetingName.required">Le nom est requis</span>
                        <span v-if="!$v.meetingName.minLength">Le nom doit avoir au moins {{ $v.meetingName.$params.minLength.min }} lettres</span>   
                        <span v-if="!$v.meetingName.maxLength">Le nom doit avoir au plus {{ $v.meetingName.$params.maxLength.max}} lettres</span>           
                        </b>
                    </b-form-group>
                <b-form-group class='form col-md-6' id="input-group-1" label="Patient:" label-for="input-1" description="">
                        <b-form-select id="apppointmentInput" v-model.number.lazy="$v.patientId.$model" :class="{
                          'is-invalid' :$v.patientId.$error, 'is-valid' : !$v.patientId.$invalid }" type="text" v-on:blur="checkCompleted" name="patientId"  placeholder="" :options='patientOptions' ></b-form-select>
                        <b class="invalid-feedback">
                        <span v-if="!$v.patientId.required">Le Patient est requis</span>
                        </b>
                </b-form-group>
                  <b-form-group class='form col-md-6' id="input-group-1" label="Docteur:" label-for="" description="">
                        <b-form-select id="apppointmentInput" v-model.number.lazy="$v.physicianId.$model" :class="{
                          'is-invalid' :$v.physicianId.$error, 'is-valid' : !$v.physicianId.$invalid }" type="text" v-on:blur="checkCompleted" name="physicianId"  placeholder="" :options='physicianOptions' ></b-form-select>
                        <b class="invalid-feedback">
                        <span v-if="!$v.physicianId.required">Le Docteur est requis</span>
                        </b>
                </b-form-group>

                        <b-form-group class='form col-md-6' id="input-group-1" label="Date:" label-for="input-4" description="">
                        <b-form-input id="apppointmentInput" v-model.trim="$v.date.$model" :class="{
                          'is-invalid' :$v.date.$error, 'is-valid' : !$v.date.$invalid }" type="date" v-on:blur="checkCompleted" name="date"  placeholder="Date"></b-form-input>
                        <b class="invalid-feedback">
                                    <span v-if="!$v.date.required">La date est requise</span>

                         </b>
                    </b-form-group>
            </div>
        </b-form>
     <div class="card-footer buttonContainer ">
      <sui-button basic primary  @click="onSubmit">Soumettre</sui-button>
    <sui-button  v-on:click="deleteCard" basic negative @click="onReset">Reset</sui-button>
              
            </div>
    
    </div>
</template>

<script>
import Fetch from '../classes/Fetch';
import Popup from '../Popup';
import { required, minLength, maxLength,  between } from 'vuelidate/lib/validators'


export default {
    name: "AppointmentPopupCreation",
    data() {
        return {
                patientId: null,
                physicianId : null,
                meetingName : null,
                data: null,
                filledInputs: 0,
                patientOptions: {},
                physicianOptions: {},
                date: null,
                show: true,
                showPopup: false,
                done: 0,
                checked: [],
                input: []
        }
    },

     validations : {
                patientId : {
                    required,
                },

                 physicianId : {
                    required,
                },

                date : {
                    required,

                },
                 meetingName : {
                    required, 
                    minLength: minLength(3),
                    maxLength: maxLength(100),
                },

            },

    components: {
        Popup,
    },

    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            this.postAppointment()
        },

        postAppointment() {

            let AppointmentBody = {
                patientId : this.patientId,
                physicianId: this.physicianId,
                meetingDate: this.date ? new Date (this.date) : null,
                meetingName: this.meetingName
            }
                        Fetch.post('http://localhost:3000/appointments', AppointmentBody)
                        .then(data => {
this.showPopup = true                        })
                        .catch(error => {
                            console.log(error)
                            alert('verifier que les champs sont bien remplis')
                        })
        },

         getDoctors() {
            var options = [{ text: 'Select One', value: null }];
            let option
            Fetch.get("http://localhost:3000/physicians")
                .then(physicians => {
                    console.log(physicians)
                    physicians.forEach(data => {
                        option = {}
                        option.text = data.firstName + ' ' + data.lastName
                        option.value = data.id,
                            options.push(option)
                    })
                    this.physicianOptions = options
                })
        },

         getPatients() {

            var options = [{ text: 'Select One', value: null }];
            let option
            Fetch.get("http://localhost:3000/patients")
                .then(patients => {
                    patients.forEach(data => {
                        option = {}
                        option.text = data.firstName + ' ' + data.lastName
                        option.value = data.id,
                            options.push(option)
                    })
                    this.patientOptions = options
                })
        },



        updateProgessBar(event) {
            this.$emit('updateProgressBar', this.done)
        },

        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.firstName = ''
            this.lastName = ''
            this.date = ''
            this.updateProgessBar()
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })

        },

        checkCompleted: function(e) {
            // find all inputs
            var totalInputs = document.querySelectorAll('#apppointmentInput').length
            var filledInputs = 0;
            console.log(totalInputs)
            document.querySelectorAll('#apppointmentInput').forEach(input => {
                console.log(input.value)
                if (input.value !== "") {
                    filledInputs++;
                }
            });
            // do the math
            var find = filledInputs / totalInputs * 100;
            // update local variable in Vue data
            this.done = Math.round(find);
            this.updateProgessBar();
        },

    },

    mounted(){
        this.getDoctors()
                this.getPatients()

    }
}
</script>

<style scoped>
.form {
    width: 65%;
}

.row{
    height: 90%;

}


.center {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}

.buttonContainer {
    display: flex;
    justify-content: center;
}

input,
select {
    border: none;
    border-bottom: 2px solid grey;
}



.container-fluid {
    display: flex;
    flex-direction: column;
    justify-content: space-between
}

.error{
    color:red
}


.card{
    height: 100%;
        }

</style>