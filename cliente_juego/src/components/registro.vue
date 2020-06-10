<template> 
<div >
      <h1>Registro</h1>
<div class="container">
      <div v-for="(registro,index) in user.registro" :key="registro._id" class="registro">
        <button type="button" 
        data-toggle="collapse" 
        :data-target="`#`+registro._id" 
        aria-expanded="false"
        class="btn btn-link">
        Registro del cuadrado: {{registro.numero}}
        </button>

        <button type="button" class="close" aria-label="Close" @click="delete_reg(index)">
           <span aria-hidden="true">&times;</span>
        </button>
        <div :id="registro._id" class="collapse contenido">
        <p v-for="lineas in registro.reg" :key="lineas._id" >
          -{{lineas.linea}}
        </p>
        </div>
        
      </div>
</div>
</div>  
</template>

<script>
import Axios from '@/service/api';
export default {
    data: function() {
    return {
      user:{}
    };
  },
  methods:{
    delete_reg: function(param){
      Axios().post("actions/delete_reg/",{
        user_id:this.user._id,
        reg_index:param
      }).then(docs=>{
         this.$store.dispatch("storage_user",docs.data);
         this.user=docs.data;
      })
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
.registro{
  display: block;
  background-color: currentColor;
  border: 1px black solid;
  border-radius: 4px;
}
.close{
  float: none;
  color: red;
}
.contenido{
  background-color: rgba(0, 0, 0, 0.575);
  color: white;
  padding: 2%;
}
.container{
  background-color: black;
  padding-top: 10px;
  border-radius: 4px;
  overflow: scroll;
  max-width: 800px;
  max-height: 400px;
}
.btn-link{
  color: rgba(56, 255, 16, 0.753);
}
.btn-link:hover{
  cursor: pointer;
}
</style>