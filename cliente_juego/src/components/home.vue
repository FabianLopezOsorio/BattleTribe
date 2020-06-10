<template>
<div class="home">
 <div class="aaa">
 <h1>Willkommen</h1>
 </div>
  <div class="card text-center bg-primary text-white mb-3">
  <div class="card-body">
      <p>Total Users</p>
      <h3>{{total}}</h3>
    <router-link :to="{name:'login'}" tag="li">
       <a class="btn btn-info">Log in</a>
    </router-link>
 
 <router-link :to="{name:'register'}" tag="li">
    <a class="btn btn-info">Register</a>
 </router-link>
 </div>
 </div>
 </div>
    
</template>

<script>
import Axios from '@/service/api';
export default {
    data: function(){
return{
    total:0
}
  },
  created(){
       Axios().get("mapa/usuarios/").then(docs=>{
         this.total=docs.data.length;
       });
    }
    
}
</script>

<style scoped>
h1{
    text-align: center;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
.home{
    text-align: center;
}
.card,.card li{
    list-style: none;
    display: inline-block;
}
.card li{
    display: inline-block;
    margin: 3px;
}
.aaa{
    background-image: url("../assets/Imagen1.jpg");
    position: relative;
    background-attachment: fixed;
    background-repeat: no-repeat;
    background-position: 0 -200px;
    text-align: center;
    color:#fff;
    min-height: 400px;
    width: 100%;
}

</style>