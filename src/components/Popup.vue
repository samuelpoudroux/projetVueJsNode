<template lang="html">
    <div class='commonpopup'>
        {{redirection()}}
        <div class='commonpopup_inner'>
            <h1>{{ text }}</h1>
        </div>
    </div>
</template>
  

<script>
import Router from 'vue-router'

export default {
    name: 'Popup',
    methods: {
        redirection: function() {
            setTimeout(() => this.setRedirection(), 1000)
        },
        setRedirection() {
            if (this.physicianAltered === true) {
              console.log("loup")
                this.$router.push({name: 'doctorList'})
            } else {
                window.location.reload()
            }
        }
    },
    props: [
        "logout",
        "text",
        "physicianAltered"
    ]
}
</script>


<style>
.commonpopup {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background-color: rgba(24, 23, 23, 0.664);
    z-index: 8;
}

.commonpopup_inner {
    position: absolute;
    left: 23%;
    right: 23%;
    top: 25%;
    bottom: 25%;
    margin: auto;
    width: 25%;
    height: 25%;
    background-color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    align-items: center
}

.commonpopup_inner h1 {
    color: #043A61;
}
</style>