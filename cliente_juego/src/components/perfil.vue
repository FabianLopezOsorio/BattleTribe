<template>
<div class="perfil">
  <h1>Perfil</h1>
    <div class="ficha">
      <img src="../assets/town.png" alt="...">
      <h4>{{user.name}}</h4>
      <label>Level: {{user.level}}</label><br> 
      <label>Exp: {{user.exp}}/{{user.exp_next}}</label> <br> 
      <label>Money: {{user.money}}</label> <br> 
      <label>Ubicación: {{user.square}}</label> <br> 
    </div>

    <div class="ficha">
      <h2>Recruitmen</h2>
      <label>Warriors: <input type="number" v-model="warriors" class="form-control"></label><br>
      <label>Archers: <input type="number" v-model="archers" class="form-control"></label><br>
      <label>Total: {{total}}</label><br>
      <label>{{msj}}</label><br>
      <button @click="recruit" class="btn btn-primary">Recruit</button>
    </div>

    <div class="ficha">
      <h2>Upgrade</h2>
      <h4>Points remaining: {{user.u_point-points_spent}}</h4>
      <h4>Soldiers HP + {{user.hp_percent+hp_mod}} % <button @click="hp_up" class="btn btn-success">+</button><button @click="hp_down" class="btn btn-danger"> -</button></h4>
      <h4>Soldiers ATK + {{user.atk_percent+atk_mod}} % <button @click="atk_up" class="btn btn-success">+</button><button @click="atk_down" class="btn btn-danger"> -</button> </h4>
      <button @click="upgrade" class="btn btn-primary">OK</button>
    </div>
</div>
</template>

<script>
import Axios from '@/service/api';
export default {
    data:function () {
    return{
      user:{},
      warriors:0,
      archers:0,
      hp_mod:0,
      atk_mod:0,
      points_spent:0,
      msj:""
    };
    },
    computed:{
      total:function () {
        return this.warriors*10+this.archers*10
      }
    },
    methods:{
      recruit: function () {
        var money_spent=this.warriors*10+this.archers*10;
        if (money_spent>this.user.money) {
          this.msj="El dinero no alcanza";
          setTimeout(() => {
           this.msj="";
         }, 3000); 
        } else {
         
            Axios().post("post/recruit/",{
            user_id:this.user._id,
            warriors:this.warriors,
            archers:this.archers,
            dinero:money_spent
          }).then(docs=>{
         this.$store.dispatch("storage_user",docs.data);
         this.user=docs.data; 
         this.msj="Reclutamiento completado"; 
         setTimeout(() => {
           this.msj="";
         }, 3000);        
       }) }
      },
      upgrade: function () {
        if (this.points_spent!=0) {
          Axios().post("post/upgrade/",{
            user_id:this.user._id,
            hp_mod:this.hp_mod,
            atk_mod:this.atk_mod,
            points_spent:this.points_spent
          }).then(docs=>{
            this.hp_mod=0;
            this.atk_mod=0;
            this.points_spent=0;
         this.$store.dispatch("storage_user",docs.data);
         this.user=docs.data;         
       })
        }
      },
      hp_up:function () {
        if (this.user.u_point-this.points_spent>0) {
          this.hp_mod+=10;
          this.points_spent++;
        } 
      },
      hp_down:function () {
        if (this.hp_mod!=0) {
          this.hp_mod-=10;
          this.points_spent--;
        } 
      },
      atk_up:function () {
        if (this.user.u_point-this.points_spent>0) {
          this.atk_mod+=10;
          this.points_spent++;
        } 
      },
      atk_down:function () {
        if (this.atk_mod!=0) {
          this.atk_mod-=10;
          this.points_spent--;
        } 
      }
    },
    created(){
    this.user=this.$store.getters.usuario;
    }
}
</script>

<style scoped>
h1{
  color:black;
  background-color:cadetblue;
  padding: 10px;
}
.perfil{
  display: block;
  overflow: auto;
}
.ficha{
  float: left;
  text-align: center;
  width: auto;
  margin: 5%;
  background-color: cadetblue;
  padding: 2%;
  border-radius: 4px;
  box-shadow: 0px 0px 12px;
  color: black;
}
.btn-success,.btn-danger{
  font-size: 8px;
}

</style>