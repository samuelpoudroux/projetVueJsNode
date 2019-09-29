<template>
  <div id="app">
    <div style="padding: 10px;">
      <a class="github-button"
         href="https://github.com/euvl/vue-js-grid"
         data-icon="octicon-star"
         data-show-count="true"
         aria-label="Star euvl/vue-js-grid on GitHub">Star</a>
    </div>
    <div class="color-header">
      <Icon :color="selected" style="width: auto;">
        vue-js-grid
      </Icon>
    </div>
    <grid
      :center="false"
      :draggable="true"
      :sortable="true"
      :items="colors"
      :height="80"
      :width="80"
      @change="change"
      @remove="remove"
      @click="click"
      @sort="sort">
      <template slot="cell" scope="props">
        <p 
              >

              {{props.item.name}}
        
        </p> 
      </template>
    </grid>
<!--
    <grid
      :center="false"
      :draggable="true"
      :sortable="true"
      :items="items"
      @change="change"
      @remove="remove"
      @sort="sort">
      <template slot="cell" scope="scope">
        <Icon :index="scope.index">
          {{scope.index}} / {{scope.sort}}
        </Icon>
      </template>
    </grid>
-->
  </div>

</template>


<script>

export default {
  name: 'drag',
  components: {
  },
  data () {
    let colors = [{"name": "ss"},{"name": "saaa"}]
    return {
      colors,
      selected: null
    }
  },
  mounted () {
    /*
    setInterval(() => {
      let item = {
        color:  generateRGBColors(1)[0],
        index: this.items.length
      }
      this.items.push(item)
    }, 5000)
    */
  },
  methods: {
    click ({ items, index }) {
      let value = items.find(v => v.index === index)
      this.selected = value.item
      console.log(this.selected)
    },
    change (event) {
      console.log('change', event)
    },
    remove (event) {
      console.log('remove', event)
    },
    sort (event) {
      console.log('sort', event)
    }
  }
}
</script>

<style lang="css">
body {
  background: #fafafa;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.color-header {
  position: relative;
  padding: 10px 0;
  box-sizing: border-box;
}