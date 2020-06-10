<template>
  <div class="map">  
    <h1 >Escenario</h1>
    <div class="perfil">  
      <div class="division">
      <div class="card text-center bg-primary text-white mb-3">
            <div class="card-body">
              <h3>Tropas</h3>
              <hr>
              <label><strong>Warriors: </strong> {{user.warriors.value}}<br>
      <img src="../assets/atk.png" alt="..." width="20px" height="20px">
        :{{user.warriors.atk+user.warriors.atk*user.atk_percent/100}} <br>
      <img src="../assets/hp.png" alt="..." width="20px" height="20px">
        :{{user.warriors.hp+user.warriors.hp*user.hp_percent/100}}</label> 
      <label><strong>Archers: </strong>{{user.archers.value}} <br> 
        <img src="../assets/atk.png" alt="..." width="20px" height="20px">
        :{{user.archers.atk+user.archers.atk*user.atk_percent/100}} <br>
        <img src="../assets/hp.png" alt="..." width="20px" height="20px">
        :{{user.archers.hp+user.archers.hp*user.hp_percent/100}}</label> 
            </div>
          </div>
      </div>

      <div class="division">
        <div class="card bg-warning text-white mb-3">
            <div class="card-body">
      <h3>Continente</h3>
      <hr>
      <label>Actual: {{continente}}</label>
      <label>Ir a:</label>
      <select class="form-control" v-model="continente">
        <option v-for="opt in 10" :key="opt">{{opt-1}}</option>
      </select>
      </div>
          </div>
      </div>

      <div class="division">
        <div class="card bg-success text-white mb-3">
            <div class="card-body">
      <h3>Movimiento</h3>
      <hr>
      <div class="float-left">
      <label>Hacia:</label>  
      <input type="number" v-model="square" class="form-control float-left"> 
      <button @click="enviar" class="btn btn-default float-left">Enviar</button>
      </div>  

      <div class="float-left">
      <label>Tropas a enviar:</label>
      <div class="float-left">
      <label>Warriors:<input type="number" v-model="war" class="form-control"></label>
      <button class="btn btn-light" @click="war=user.warriors.value">All</button>  
      </div>  
      <div class="float-left">  
      <label>Archers:<input type="number" v-model="arch" class="form-control"></label> 
      <button class="btn btn-light" @click="arch=user.archers.value">All</button> 
      </div>
      <p >{{msg}}<label v-if="tiempo!=0"> {{tiempo/1000}} segundos</label></p>
      </div>
      </div>
          </div>
      </div>
      
    </div>

    <div class="escenario">
       <div v-for="(square,index) in 200" :key="square.id" class="cuadrado" @click="ir(index)" :title="index+continente*200">
         <img :src="getImgUrl(index)" alt="..." width="40px" height="40px" class="imagen" v-if="getImgUrl(index)">
       </div>
    </div> 
   
  </div>
</template>

<script>
import Axios from '@/service/api';
export default {
  data: function() {
    return {
      user:{},
      continente:0,
      square:0,
      war:0,
      arch:0,
      msg:"",
      tiempo:0
    };
  },
  methods: {
    
     enviar: function () {
       if (this.war>this.user.warriors.value || this.arch>this.user.archers.value) {
         this.msg="No hay suficientes tropas";
         setTimeout(() => {
         this.msg="";
         }, 3000);
       } else if(this.square>=2000){
         this.msg="Ubicacion desconocida";
         setTimeout(() => {
         this.msg="";
         }, 3000);
       }else{
         var war_send=this.war;
         var arch_send=this.arch;
         var square_send=this.square;
         this.tiempo=(Math.ceil(Math.abs(this.user.square-this.square)/200))*10000;

          Axios().post('actions/explorar/',{
          user_id:this.$store.getters.user_id,
          warriors:war_send,
          archers:arch_send,
          square:square_send,
          tiempo_exp:this.tiempo        
       }).then(docs=>{
         this.$store.dispatch("storage_user",docs.data);
         this.user=docs.data; 
         this.msg="";
         this.tiempo=0;               
       })        
       }       
     },
     getImgUrl: function (params) {
       var indice=params+this.continente*200;
       var found = this.user.map_reveled.find(function(element) {
          return element.cuadrado==indice;
      });
      if (found==undefined ) {
        return require('../assets/square.png'); 
      }else if(found.path==''){
        return "";
      } else{
        return require('../assets/'+found.path);
      } 
     },
     ir: function (params) {
       this.user=this.$store.getters.usuario;
      var indice=params+this.continente*200;
       this.square=indice;
     }
  },
  created() {
    this.user=this.$store.getters.usuario; 
    this.continente=Math.floor(this.user.square/200); 
   }
};
</script>

<style scoped>
h1{
  color:black;
  background-color:cadetblue;
  padding: 10px;
}
.cuadrado{
  height: 50px;
  width: 50px;
  float:left;
  opacity: 1; 
  text-align: center;
  transition: all 0.3s linear;
}
.escenario{
  width: 1250px;
  background-image: url("../assets/images.jpg");
  margin: 3%;
}
.perfil{
  width: 100%;
}
.perfil,.escenario{
  overflow: auto;
  height: auto;
  display: block;
}
hr{
  margin-top: 0;
}
label{
  width: 100%;
}
.cuadrado:hover{
/* transform: scale(1.3); */
box-shadow: 0px 0px 8px 10px rgba(255, 255, 255, 0.5);
/* box-shadow: 0px 0px 30px rgb(255, 255, 255); */
}
.division{
  width: auto;
  float: left;
  margin-left: 4%;
}
.form-control{
  width: 80px;
}
.imagen{
  margin-top: 4px;
}

</style>