
<template>
    <div>
        <div v-if="showPopup === true ">
            <Popup text="Votre medecin à bien été modifié" :physicianAltered="true" />
        </div>
        <b-form class='center' @submit="onSubmit" @reset="onReset">
            <b-form-group class='form' id="input-group-1" label="Nom:" label-for="input-1" description="">
                <b-form-input id="input-1" v-model="physicianData.lastName" placeholder="Enter Nom"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-2" label="Prénom:" label-for="input-2">
                <b-form-input id="input-2"   v-model="physicianData.firstName" placeholder="Prénom"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="Age:" label-for="input-3">
                <b-form-input v-model="physicianData.age"   id="input-2" placeholder="Age"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="Rue:" label-for="input-3">
                <b-form-input    v-model="addressData.street" id="input-2" placeholder="Rue"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="Ville:" label-for="input-3">
                <b-form-input    v-model="addressData.city" id="input-2" placeholder="Ville"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="Pays:" label-for="input-3">
                <b-form-input v-model="addressData.country"  id="input-2" placeholder="Pays"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form' id="input-group-3" label="Numero:" label-for="input-3">
                <b-form-input v-model="addressData.door" id="input-2" placeholder="Numero"></b-form-input>
            </b-form-group>
    
            <b-form-group class='form row' id="input-group-3" label="specialité:" label-for="input-3">
                <span></span>
                <b-form-select  id="input-3" v-model="form.specialityId" :options="specialities"></b-form-select>
            </b-form-group>
    
            <b class='row'>
                      <b-button type="submit" variant="primary">Submit</b-button>
                      <b-button type="reset" variant="danger">Reset</b-button>
            </b>
        </b-form>
    </div>
</template>

<script>
import Fetch from '../classes/Fetch.js';
import Popup from '../Popup.vue';


export default {
    name: "DoctorPopupCreation",
    data() {
        return {
            form: {
                specialityId: null,
                checked: []
            },

            physicianData: {
                firstName: "",
                lastName: "",
                age: null,
                addressId: ""
            },
            addressData: {
                street: "",
                city: "",
                country: "",
                door: "",
            },

           

            physician: undefined,
            addressData: undefined,
            specialityData: undefined,

            specialities: undefined,

            show: true,
            showPopup: false,
        }
    },

    components: {
        Popup,
    },

    props: [
        "id"
    ],

    methods: {
        onSubmit(evt) {
            evt.preventDefault()
            this.postPhysician()
        },

        postPhysician() {
            let addressBody = {
                street: this.addressData.street,
                city: this.addressData.city,
                country: this.addressData.country,
                door: this.addressData.door
            }

            let physicianBody = {
                firstName: this.physicianData.firstName,
                lastName: this.physicianData.lastName,
                age: this.physicianData.age,
                addressId: "",
                specialityId: this.form.specialityId
            }

            Fetch.put('http://localhost:3000/addresses/' + this.addressData.id, addressBody)
                .then(addressData => {
                    console.log(addressData)
                    physicianBody.addressId = addressData.id
                    let physicianData = this.physicianData
                    Fetch.put('http://localhost:3000/physicians/' + this.physicianData.id, physicianBody)
                        .then(data => {
                            this.showPopup = true
                        })
                })


        },




        getSpecialities() {
            var options = [{ text: 'Select One', value: null, }];
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
            console.log("aa")
            // Reset our form values
            this.physicianData.firstName = ''
            this.physicianData.lastName = ''
            this.physicianData.age = ''
            this.addressData.street = ''
            this.addressData.city = ''
            this.addressData.country = ''
            this.addressData.door = ''
            // Trick to reset/clear native browser form validation state
            this.show = false
            this.$nextTick(() => {
                this.show = true
            })

        },

        getPhysicianData() {
            Fetch.get("http://localhost:3000/physicians/" + this.id)
                .then(data => {
                    console.log(data)
                    var fetches = []
                    fetches.push(fetch("http://localhost:3000/addresses/" + data.addressId))
                    if (data.specialityId !== null) {
                        fetches.push(fetch("http://localhost:3000/specialities/" + data.specialityId))
                    }

                    Promise.all(fetches)
                        .then((results) => {
                            var jsons = [];
                            results.forEach(function(item) {
                                if (item.ok) {
                                    jsons.push(item.json());
                                } else {
                                    throw new Error("An error occurred while trying to fetch the data.");
                                }
                            })
                            return Promise.all(jsons);
                        })
                        .then(dataFetches => {
                            this.physicianData = data,
                                this.addressData = dataFetches[0],
                                this.specialityData = dataFetches[1]
                            this.specialityId = dataFetches[1].id
                            console.log(dataFetches)

                        })
                })
       
        }
    },

    mounted() {
        this.getPhysicianData()
        this.getSpecialities()
    }
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

.row {
    display: inline-block
}
</style>