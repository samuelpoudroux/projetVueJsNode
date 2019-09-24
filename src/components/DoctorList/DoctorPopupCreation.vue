
<template>
    <div>
        <b-form class='center' @submit="onSubmit" @reset="onReset">
            <h3 class="mt-3">Ajouter un medecin</h3>
            <b-form-group class='form' id="input-group-1" label="Nom:" label-for="input-1" description="">
                <div v-if="showPopup === true ">
                    <Popup text="Votre medecin à bien été créé" />
                </div>
                <b-form-input id="input-1" v-model="physicianData.lastName" type="" required v-on:blur="requiredInput"  data-name="lastName" placeholder="Enter Nom"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-2" label="Prénom" label-for="input-2">
                <b-form-input id="input-2" required v-on:blur="requiredInput" data-name="firstName" v-model="physicianData.firstName" placeholder="Prénom"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="Age:" label-for="input-3">
                <b-form-input v-model="physicianData.age" required v-on:blur="requiredInput" data-name="age" id="input-2" placeholder="Age"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="Rue:" label-for="input-3">
                <b-form-input required v-on:blur="requiredInput" data-name="street" v-model="physicianData.street" id="input-2" placeholder="Rue"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="Ville:" label-for="input-3">
                <b-form-input required v-on:blur="requiredInput" data-name="city" v-model="physicianData.city" id="input-2" placeholder="Ville"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="Pays:" label-for="input-3">
                <b-form-input v-model="physicianData.country" required v-on:blur="requiredInput" data-name="country" id="input-2" placeholder="Pays"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="Numero:" label-for="input-3">
                <b-form-input required v-on:blur="requiredInput" data-name="door" v-model="physicianData.door" id="input-2" placeholder="Numero"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="specialité:" label-for="input-3">
                <b-form-select id="input-3" v-model="physicianData.specialityId" :options='specialities'></b-form-select>
            </b-form-group>
    
            <b class='row'>
                                          <b-button type="submit" variant="primary">Submit</b-button>
                                          <b-button type="reset" variant="danger">Reset</b-button>
                                          </b>
        </b-form>
    
        <button v-on:click="updateProgessBar">aa</button>
    </div>
</template>

<script>
import Fetch from '../classes/Fetch.js';
import Popup from '../Popup.vue';


export default {
    name: "DoctorPopupCreation",
    data() {
        return {
            physicianData: {
                firstName: null,
                lastName: null,
                age: null,
                addressId: null,
                street: null,
                city: null,
                country: null,
                door: null,
                specialityId: null
            },

            checks: {
                firstName: null,
                lastName: null,
                age: null,
                addressId: null,
                street: null,
                city: null,
                country: null,
                door: null,
                specialityId: null
            },

            specialities: {},
            show: true,
            showPopup: false,
            done: 0,
            checked: [],
            input: []
        }
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
                street: this.physicianData.street,
                city: this.physicianData.city,
                country: this.physicianData.country,
                door: this.physicianData.door
            }

            let physicianBody = {
                firstName: this.physicianData.firstName,
                lastName: this.physicianData.lastName,
                age: this.physicianData.age,
                addressId: "",
                specialityId: this.physicianData.specialityId
            }

            Fetch.post('http://localhost:3000/addresses/', addressBody)
                .then(addressData => {
                    physicianBody.addressId = addressData.id
                    Fetch.post('http://localhost:3000/physicians', physicianBody)
                        .then(data => {
                            this.showPopup = true
                        })
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
            this.physicianData.firstName = ''
            this.physicianData.lastName = ''
            this.physicianData.age = ''
            this.physicianData.street = ''
            this.physicianData.city = ''
            this.physicianData.country = ''
            this.physicianData.door = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })

        },

        requiredInput(event) {
            if (this.checks[event.target.dataset.name] !== this.physicianData[event.target.dataset.name]) {
                this.checks[event.target.dataset.name] = event.target.value
                this.done += 14.28
                this.updateProgessBar(event)
                console.log("firstCONDITION")
            } else if (this.checks[event.target.dataset.name] === this.physicianData[event.target.dataset.name]) {
                this.checks[event.target.dataset.name] = "",
                console.log('second')
            } else  {
                console.log("LL")
                  this.done -= 14.28,
                    this.updateProgessBar(event)
            }
        },

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

.center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center
}
</style>