<template>
  <div id="app">
    <Header></Header>
    <navbar></navbar>   
    <router-view></router-view> 
    <piepag></piepag>
     
  </div>
</template>

<script>

import Header from './components/Header.vue'
import navbar from './components/navbar.vue'
import piepag from './components/piepag.vue'


export default {
  name: 'app',
  data: function(){
return{
  
}
  },
  components: {
    Header,
    navbar,
    piepag
  },
  
  created(){  
    this.$store.dispatch("storage");    
   }
   
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: rgb(196, 195, 195);
}
html{
  background-color: rgb(196, 195, 195);
}

</style>
