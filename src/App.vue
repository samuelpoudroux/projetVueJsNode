
<template>
  <div id='app'>
    <Menu :logout="logout" :login="login"/>
    <router-view />
  </div>
</template>

<script>
import Menu from './menu.vue'
export default {
  name: "App",
  components: {
    Menu,
  },
  data() {
    return {
      activeUser: null,
        authenticated:undefined,
    };
  },
  async created() {
    await this.refreshActiveUser();
  },

  watch: {
    // everytime a route is changed refresh the activeUser
    $route: "refreshActiveUser"
  },
  methods: {
    async login() {
      this.$auth.loginRedirect();
      this.$router.push("/home");
    },

    async refreshActiveUser() {
      this.activeUser = await this.$auth.getUser();
    },
    async logout() {
      await this.$auth.logout();
      await this.refreshActiveUser();
      this.$router.push("/");
    }
  },  
};
</script>

<style>
body {
  margin: 0;
  height: 100vh
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
    
  
}

.navBar{
  background: black
}
main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: 0.02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}



</style>
