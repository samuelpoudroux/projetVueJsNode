<template>
  <div>

    <b-form class='center' @submit="onSubmit" @reset="onReset">
      <h3 class="mt-3">Ajouter un medecin</h3>

       <b-form-group class='form'
        id="input-group-1"
        label="Nom:"
        label-for="input-1"
        description=""
      >
        <b-form-input
          id="input-1"
          v-model="physicianData.lastName"
          type=""
          required
          placeholder="Enter Nom"
        ></b-form-input>
      </b-form-group>

      <b-form-group class='form' id="input-group-2" label="Prénom" label-for="input-2">
        <b-form-input
          id="input-2"
        required
                  v-model="physicianData.firstName"
          placeholder="Prénom"
        ></b-form-input>
      </b-form-group>

      <b-form-group class='form' id="input-group-3" label="Age:" label-for="input-3">
       <b-form-input
        v-model="physicianData.age"
          id="input-2"
          placeholder="Age"
        ></b-form-input>
      </b-form-group>

        <b-form-group class='form' id="input-group-3" label="Rue:" label-for="input-3">
       <b-form-input
                 required
        v-model="addressData.street"
          id="input-2"
          placeholder="Rue"
        ></b-form-input>
      </b-form-group>
      
        <b-form-group class='form' id="input-group-3" label="Ville:" label-for="input-3">
       <b-form-input
                 required
        v-model="addressData.city"
          id="input-2"
          placeholder="Ville"
        ></b-form-input>
      </b-form-group>

        <b-form-group class='form' id="input-group-3" label="Pays:" label-for="input-3">
       <b-form-input
                 v-model="addressData.country"
                           required
          id="input-2"
          placeholder="Pays"
        ></b-form-input>
      </b-form-group>

        <b-form-group class='form' id="input-group-3" label="Numero:" label-for="input-3">
       <b-form-input
          required
        v-model="addressData.door"
          id="input-2"
          placeholder="Numero"
        ></b-form-input>
      </b-form-group>

      <b-form-group class='form' id="input-group-3" label="specialité:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="speciality.name"
          :options="foods"
        ></b-form-select>
      </b-form-group>

      <b class='row'>
      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
      </b>
    </b-form>
  </div>
</template>

<script>
  export default {
      name: "DoctorPopupCreation",
    data() {
      return {
            form: {
                specialityId: "",
                checked:[]
            },
            speciality: {
                name:"",

            },
            physicianData:{
                firstName: "",
                lastName: "",
                age: null,
                addressId:""
            },
            addressData: {
                street: "",
                city: "",
                country: "",
                door: "",
            },
            show:true
      }
    },

    methods: {
      onSubmit(evt) {
        evt.preventDefault()
        this.postPhysician()
      },

      postPhysician(){
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
                addressId:""
        }

        

        fetch('http://localhost:3000/addresses/', {
            method: 'POST',
           headers: {
                "Content-Type": "application/json"
            },
                body: JSON.stringify(addressBody)
            }).then(response => {
                return response.json()
                })
                .then(addressData=> {
                physicianBody.addressId = addressData.id
                let physicianData = this.physicianData
                fetch('http://localhost:3000/physicians', {
                method: 'POST',
               headers: {
                "Content-Type": "application/json"
            },
                    body: JSON.stringify(physicianBody)
                }).then(physicianDataResponse => {
                    console.log(physicianDataResponse)
                })
            })
               
    },

      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.firstName = ''
        this.form.lastName= ''
        this.form.age = ''
        this.form.street = ''
        this.form.city = ''
        this.form.country = ''
        this.form.door = ''
        this.form.name = ''
        // Trick to reset/clear native browser form validation state
          this.show = false
        this.$nextTick(() => {
          this.show = true
        })
        
      }
    }
  }
</script>

<style scoped>

.form{
    width: 65%;
}

.center{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center
}

</style>