<template lang="html">
  <div>
    <sui-card >
      <sui-card-content>
        <sui-card-header>
          Mon profil
        </sui-card-header>
      </sui-card-content>
      <sui-card-content>
        <!--
          sui-feed is not available yet, therefore base semantic ui has been substituted for now
        -->
        <div class="ui small feed">
          <div class="event">
            <div class="content">
                <em  v-if="usersInfo !==null">
                {{ usersInfo.name }}
              </em>
            </div>
          </div>
          <div class="event">
            <div class="content">
                <em  v-if="usersInfo !==null">
                {{ usersInfo.email }}
              </em>
            </div>
          </div>
        </div>
        <!-- end of base semantic ui, to be updated in the future with sui-feed -->
      </sui-card-content>
    </sui-card>
  </div>
</template>
  

 <script>
export default {
    name: 'Menu' ,
    data() {
      return {
        usersInfo: null
    }
    },

    created () {
       this.getUserInfo() 
    },

    methods: {
       getUserInfo () {
     this.$auth.getUser()
     .then(data => {
       this.usersInfo = data; 
       console.log(this.userInfo)
     })
      }
    },
    props: [
      "logout",

    ]

    

}
  </script>


<style>

.navigation{
  display: flex;
  flex-direction: column;
  background: red
}


</style>