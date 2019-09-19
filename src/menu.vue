
  <Template>
    <b-navbar id='menu' toggleable="md" type="dark" variant="dark">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/doctorList">Liste des medecins</b-nav-item>
          <b-nav-item to="/patientList">liste des patients</b-nav-item>
          <b-nav-item to="/appointmentList">liste des rendez-vous</b-nav-item>
          <b-nav-item href="#" @click.prevent="login" v-if="!activeUser">Login</b-nav-item>
          <b-nav-item href="#" @click.prevent="logout" v-else>Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </Template>
  
  <script>

    
export default {
        name:"menu"
        
    }
  </script>
