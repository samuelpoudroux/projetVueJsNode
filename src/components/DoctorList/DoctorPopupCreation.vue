
<template>
    <div class="card">
        <h4 class=" card-header text-center">Ajouter un medecin</h4>
        <b-form class='center'>
            <div v-if="showPopup === true ">
                <Popup text="Votre medecin à bien été créé" />
            </div>
                <div class='row p-3'>
                <b-form-group class='form col-md-6' id="input-group-1" label="Nom:" label-for="input-1" description="">
                        <b-form-input id="input-1" v-model.trim="$v.lastName.$model" :class="{
                          'is-invalid' :$v.lastName.$error, 'is-valid' : !$v.lastName.$invalid }" type="text" v-on:blur="checkCompleted" name="lastName"  placeholder="Nom"></b-form-input>
                          <b class="valid-feedback">Votre nom est valide</b>
                        <b class="invalid-feedback">
                        <span v-if="!$v.lastName.required">Le nom est requis</span>
                        <span v-if="!$v.lastName.minLength">Le nom doit avoir au moins {{ $v.lastName.$params.minLength.min }} lettres</span>   
                        <span v-if="!$v.lastName.maxLength">Le nom doit avoir au plus {{ $v.lastName.$params.maxLength.max}} lettres</span>           
                        </b>
                    </b-form-group>
                    <b-form-group class='form col-md-6' id="input-group-1" label="Prénom:" label-for="input-1" description="">
                        <b-form-input id="input-1" v-model.trim="$v.firstName.$model" :class="{
                          'is-invalid' :$v.firstName.$error, 'is-valid' : !$v.firstName.$invalid }" type="text" v-on:blur="checkCompleted" name="firstName"  placeholder="Prénom"></b-form-input>
                          <b class="valid-feedback">Votre prénom est valide</b>
                        <b class="invalid-feedback">
                        <span v-if="!$v.firstName.required">Le prénom est requis</span>
                        <span v-if="!$v.firstName.minLength">Le prénom doit avoir au moins {{ $v.firstName.$params.minLength.min }} lettres</span>   
                        <span v-if="!$v.firstName.maxLength">Le prénom doit avoir au plus {{ $v.firstName.$params.maxLength.max}} lettres</span>           
                        </b>
                    </b-form-group>

                     <b-form-group class='form col-md-6' id="input-group-1" label="Age:" label-for="input-1" description="">
                        <b-form-input id="input-1" v-model.number.lazy="$v.age.$model" :class="{
                          'is-invalid' :$v.age.$error, 'is-valid' : !$v.age.$invalid }" type="number" v-on:blur="checkCompleted" name="age"  placeholder="Age"></b-form-input>
                          <b class="valid-feedback">Votre age est valide</b>
                        <b class="invalid-feedback">
                        <span v-if="!$v.age.required"> l'age est requis</span>
                        <span v-if="!$v.age.between"> Votre age doit se situer entre {{ $v.age.$params.between.min}} et {{ $v.age.$params.between.max}} </span>
                        </b>
                    </b-form-group>

                     <b-form-group class='form col-md-6' id="input-group-3" label="specialité:" label-for="input-3">
                        <b-form-select id="input-3" v-model="specialityId" :options='specialities'></b-form-select>
                    </b-form-group>

                     <b-form-group class='form col-md-6' id="input-group-1" label="N°:" label-for="input-1" description="">
                        <b-form-input id="input-1" v-model.number.lazy="$v.door.$model" :class="{
                          'is-invalid' :$v.door.$error, 'is-valid' : !$v.door.$invalid }" type="number" v-on:blur="checkCompleted" name="door"  placeholder="N°"></b-form-input>
                          <b class="valid-feedback">Votre numero de rue est valide</b>
                        <b class="invalid-feedback">
                        <span v-if="!$v.door.required"> le numero de rue est requis</span>
                        </b>
                    </b-form-group>

                    <b-form-group class='form col-md-6' id="input-group-1" label="rue:" label-for="input-1" description="">
                        <b-form-input id="input-1" v-model.trim="$v.street.$model" :class="{
                          'is-invalid' :$v.street.$error, 'is-valid' : !$v.street.$invalid }" type="text" v-on:blur="checkCompleted" name="street"  placeholder="Rue"></b-form-input>
                          <b class="valid-feedback">Le nom est valide</b>
                        <b class="invalid-feedback">
                        <span v-if="!$v.street.required">Le nom de la rue est requis</span>
                        <span v-if="!$v.street.minLength">Le nom de la rue doit avoir au moins {{ $v.street.$params.minLength.min }} lettres</span>   
                        <span v-if="!$v.street.maxLength">Le nom de la rue doit avoir au plus {{ $v.street.$params.maxLength.max}} lettres</span>                           </b>
                    </b-form-group>

                     <b-form-group class='form col-md-6' id="input-group-1" label="Ville:" label-for="input-1" description="">
                        <b-form-input id="input-1" v-model.trim="$v.city.$model" :class="{
                          'is-invalid' :$v.city.$error, 'is-valid' : !$v.city.$invalid }" type="text" v-on:blur="checkCompleted" name="city"  placeholder="Ville"></b-form-input>
                          <b class="valid-feedback">La ville est valide</b>
                        <b class="invalid-feedback">
                        <span v-if="!$v.city.required">le nom de la ville est requis</span>
                        <span v-if="!$v.city.minLength">le nom de la ville doit avoir au moins {{ $v.city.$params.minLength.min }} lettres</span>   
                        <span v-if="!$v.city.maxLength">le nom de la ville doit avoir au plus {{ $v.city.$params.maxLength.max}} lettres</span>                           </b>
                    </b-form-group>

                      <b-form-group class='form col-md-6' id="input-group-1" label="pays:" label-for="input-1" description="">
                        <b-form-input id="input-1" v-model.trim="$v.country.$model" :class="{
                          'is-invalid' :$v.country.$error, 'is-valid' : !$v.country.$invalid }" type="text" v-on:blur="checkCompleted" name="country"  placeholder="Pays"></b-form-input>
                          <b class="valid-feedback">Le pays est valide</b>
                        <b class="invalid-feedback">
                        <span v-if="!$v.country.required">le nom du pays est requis</span>
                        <span v-if="!$v.country.minLength">le nom du pays doit avoir au moins {{ $v.country.$params.minLength.min }} lettres</span>   
                        <span v-if="!$v.country.maxLength">le nom du pays doit avoir au plus {{ $v.country.$params.maxLength.max}} lettres</span>                           </b>
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
import Fetch from '../classes/Fetch.js';
import Popup from '../Popup.vue';
import { required, minLength, maxLength,  between } from 'vuelidate/lib/validators'


export default {
    name: "DoctorPopupCreation",
    data() {
        return {
             firstName: null,
                lastName: null,                
                addressId: null,
                age:null,
                street: null,
                city: null,
                country: null,
                door: null,
                specialityId: null,

            filledInputs: 0,

            specialities: {},
            show: true,
            showPopup: false,
            done: 0,
            checked: [],
            input: []
        }
    },

     validations : {
                firstName : {
                    required, 
                    minLength: minLength(3),
                    maxLength: maxLength(10),
                },

                 lastName : {
                    required, 
                    minLength: minLength(3),
                    maxLength: maxLength(10),
                },

                 age : {
                    required,
                    between: between(18, 70),
                },

                 door : {
                    required,

                },

                 street : {
                    required, 
                    minLength: minLength(3),
                    maxLength: maxLength(10),
                },

                 country : {
                    required, 
                    minLength: minLength(3),
                    maxLength: maxLength(10),
                },

                city : {
                    required, 
                    minLength: minLength(3),
                    maxLength: maxLength(10),
                },
            },

    components: {
        Popup,
    },

    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            this.postPhysician()
        },

        postPhysician() {
            let addressBody = {
                street: this.street,
                city: this.city,
                country: this.country,
                door: this.door
            }

            let physicianBody = {
                firstName: this.firstName,
                lastName: this.lastName,
                age: this.age,
                addressId: "",
                specialityId: this.specialityId
            }

            Fetch.post('http://localhost:3000/addresses/', addressBody)
                .then(addressData => {
                    physicianBody.addressId = addressData.id
                    Fetch.post('http://localhost:3000/physicians', physicianBody)
                        .then(data => {
                            this.showPopup = true
                        }).catch(error => {
                            alert('verifier que les champs sont bien remplis')
                        })
                }).catch(error => {
                            alert('verifier que les champs sont bien remplis')
                        })


        },

        updateProgessBar(event) {
            this.$emit('updateProgressBar', this.done)
        },

        getSpecialities() {

            var options = [{ text: 'Select One', value: null }];
            let option
            Fetch.get("http://localhost:3000/specialities")
                .then(speciality => {
                    speciality.forEach(data => {
                        option = {}
                        option.text = data.label
                        option.value = data.id,
                            options.push(option)
                    })
                    this.specialities = options
                })
        },

        onReset(evt) {
            evt.preventDefault()
            // Reset our form values
            this.firstName = ''
            this.lastName = ''
            this.age = ''
            this.street = ''
            this.city = ''
            this.country = ''
            this.door = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })

        },

        checkCompleted: function(e) {
            // find all inputs
            var totalInputs = document.querySelectorAll('input').length
            var filledInputs = 0;
            document.querySelectorAll('input').forEach(input => {
                if (input.value !== "") {
                    filledInputs++;
                }
            });
            // do the math
            var find = filledInputs / totalInputs * 100;
            // update local variable in Vue data
            this.done = Math.round(find);
            this.updateProgessBar();
            this.checkForm(e)
        },

         checkForm:function(e) {
      if(this.physicianData[e.target.name])  {
          this.error[e.target.name] = null;
                    return true;
      }
      if(!this.physicianData[e.target.name]) {
this.error[e.target.name] = `${e.target.name} is required`;
      } 
        e.preventDefault();
    }
  },

    mounted() {
        this.getSpecialities()
    },

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