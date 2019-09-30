<template>
    <div>
        <b-navbar toggleable="lg" type="dark" variant="info" class='menu'>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" class='center' is-nav>
                    <router-link to="/" >Accueil</router-link>
                    <router-link to="/doctorList">Listes des docteurs</router-link>
                    <router-link to="/patientList">Listes des patients</router-link>
                    <router-link to="/appointmentList">Listes des rendez-vous</router-link>
                    <router-link to="/drag">drag</router-link>
    
                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template v-slot:button-content>
                  <em  v-if="usersInfo ===undefined">
                  profil
                  </em>
                   <em v-else >
                    {{ usersInfo.name}}
    
                  </em>
</template>
              <b-dropdown-item href="/myProfile">Profile</b-dropdown-item>
             <b-dropdown-item v-if="authenticated==true" href="#" v-on:click="logout">Se deconnecter</b-dropdown-item>
              <b-dropdown-item v-else v-on:click="login">Se connecter</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
</div>

 </template>

<script>
export default {
    name: 'Menu',
    data() {
        return {
            usersInfo: undefined
        }
    },

    created() {
        this.getUserInfo()
    },

    updated() {
        this.isAuthenticated()
        this.getUserInfo()

    },

    methods: {
        getUserInfo() {
            this.$auth.getUser()
                .then(data => {
                    this.isAuthenticated()
                    this.usersInfo = data;
                })
        },

        async isAuthenticated() {
            this.authenticated = await this.$auth.isAuthenticated()
            console.log(this.authenticated)
        },
    },
    props: [
        "logout", "login", "authenticated"
    ]
}
</script>


<style scoped>
.menu {
    background: black !important;
}

nav a {
    color: white;
    margin-left: 1%;
    font-size: 1.3em
}

nav a.router-link-active {
    color: #0A79FB
}

.center{
  display:flex;
  justify-content:space-between;
  align-content:center;
}
</style>