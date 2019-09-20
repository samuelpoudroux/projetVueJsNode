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
          v-model="form.lastName"
          type=""
          required
          placeholder="Enter Nom"
        ></b-form-input>
      </b-form-group>

      <b-form-group class='form' id="input-group-2" label="Prénom" label-for="input-2">
        <b-form-input
          id="input-2"
        required
          placeholder="Prénom"
        ></b-form-input>
      </b-form-group>

      <b-form-group class='form' id="input-group-3" label="Age:" label-for="input-3">
       <b-form-input
        v-model="form.age"
          id="input-2"
          placeholder="Age"
        ></b-form-input>
      </b-form-group>

        <b-form-group class='form' id="input-group-3" label="Rue:" label-for="input-3">
       <b-form-input
                 required
        v-model="form.street"
          id="input-2"
          placeholder="Rue"
        ></b-form-input>
      </b-form-group>
      
        <b-form-group class='form' id="input-group-3" label="Ville:" label-for="input-3">
       <b-form-input
                 required
        v-model="form.city"
          id="input-2"
          placeholder="Ville"
        ></b-form-input>
      </b-form-group>

        <b-form-group class='form' id="input-group-3" label="Pays:" label-for="input-3">
       <b-form-input
                 v-model="form.country"
                           required


          id="input-2"
          placeholder="Pays"
        ></b-form-input>
      </b-form-group>

        <b-form-group class='form' id="input-group-3" label="Numero:" label-for="input-3">
       <b-form-input
                 v-model="form.door"
          required

          id="input-2"
          placeholder="Numero"
        ></b-form-input>
      </b-form-group>

      <b-form-group class='form' id="input-group-3" label="specialité:" label-for="input-3">
        <b-form-select
          id="input-3"
          v-model="form.name"
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
                firstName: "",
                lastName: "",
                age: "",
                specialityId: "",
                addressId: "",
                street: "",
                city: "",
                country: "",
                door: "",
                name:"",
                checked:[]
            },

            show:true

        }
    },

    methods: {
      onSubmit(evt) {
        evt.preventDefault()
                alert(JSON.stringify(this.form))

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