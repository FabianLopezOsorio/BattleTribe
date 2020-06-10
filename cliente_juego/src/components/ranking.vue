<template>
<div class="ranking">
  <h1>Ranking</h1>
    <table class="table table-dark table-bordered">
  <thead class="thead-dark">
    <tr class="indice">
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Level</th>
      <th scope="col">Experiencia</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(user,i) in users" :key="user._id" :class="{filas:true,'bg-warning':i==0,'bg-info':i==1,'bg-success':i==2}">
      <th scope="row">{{i+1}}</th>
      <td>{{user.name}}</td>      
      <td>{{user.level}}</td>      
      <td>{{user.exp}}</td>      
    </tr>
  </tbody>
</table>
</div>    
</template>

<script>
import Axios from '@/service/api';
export default {
  data: function() {
    return {
      users:[]
    };
  },
    created(){
      Axios().get("mapa/usuarios/").then(docs=>{
        var users=docs.data;
        users.sort(function(a, b) {
            return b.exp-a.exp;
        });
         this.users=users;
       });
    }
}
</script>

<style scoped>
h1{
  color:black;
  background-color:slategray;
  padding: 10px;
  margin: auto;
}
.ranking{
  display: inline;
  background-color: transparent;
  box-shadow: 0px 0px 10px;
  overflow: auto;
}
.indice{
  background-color: rgb(0, 0, 0);
  color: rgb(255, 255, 255);
}
.filas{
  background-color: rgba(126, 126, 126,0.5);
  color: white;

}
</style>
