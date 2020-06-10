<template>
    <div>
        <h2>Mapa</h2>
        <button @click="deleteMap">Delete Map</button>
        <button @click="createMap">Create Map</button>
        <h2>Usuarios</h2>
        <div v-for="user in users" :key="user._id">
            {{user.name}}
            <button @click="eliminar_user(user._id)">Eliminar</button>
        </div>
        <p>{{msg}}</p>
    </div>
</template>

<script>
import Axios from '@/service/api';
export default {
    data: function() {
    return {
      users:[],
      msg:""
    };
  },
    methods:{
        deleteMap: function () {
            Axios().get("mapa/delete/");
        },
        createMap: function () {
            Axios().post("mapa/newMap/",{
                algo:"posteo"
            });
        },
        eliminar_user:function (params) {
            Axios().post("mapa/delete_user/",{
                id:params
            }).then(docs=>{
                this.msg=docs.data;
                setTimeout(() => {
                    this.msg="";
                }, 3000);
            });   
        }
    },
    created(){
       Axios().get("mapa/usuarios/").then(docs=>{
         this.users=docs.data;
       });
    }
}
</script>

<style scoped>

</style>