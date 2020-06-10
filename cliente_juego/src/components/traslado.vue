<template>
    <div>
        <h1>Traslado</h1>
        <div class="align-middle w-25">
            <h5>Lugar al cual trasladarse:</h5>
            <input type="number" v-model="m_square" class="form-control">
            <p v-if="msj!=''">{{msj}}</p>
             <!-- Button trigger modal -->
<button type="button" class="btn btn-light" data-toggle="modal" data-target="#traslado">
  Traslado
</button>

<!-- Modal -->
<div class="modal fade" id="traslado" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Pregunta</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h6><strong>Orden de traslado:</strong> </h6>
        <p>Quiere trasladarse a la ubicación: {{m_square}}</p>
        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="traslado">Ok</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
        </div>
    </div>
</template>

<script>
import Axios from '@/service/api';
export default {
    data:function () {
    return{
      user:{},
      msj:'',
      m_square:0
    };
    },
    methods:{
        traslado:function(){
            Axios().post('/traslado/move',{
                id:this.user._id,
                m_square:this.m_square,
                user_square:this.user.square
            }).then(docs=>{
                this.m_square=0;
                this.msj=docs.data;
                setTimeout(()=>{
                  this.msj="";
                },3000)
                
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
</style>
