<template>
<div >
  <ul class="navbar navbar-expand-sm navbar-dark bg-dark p-0 navbar-nav">
     <router-link
     v-show="!this.$store.getters.userLogIn" 
     tag="li" 
     active-class="active" 
     :to="{name: 'home'}" 
     exact
     ><a class="nav-item px-2 nav-link active">Home</a>
     </router-link>

     <router-link 
     v-show="this.$store.getters.userLogIn"
     tag="li" 
     active-class="active" 
     :to="{name: 'escenario'}">
     <a class="nav-item px-2 nav-link">Escenario</a>
     </router-link> 
   
     <router-link
     v-show="this.$store.getters.userLogIn" 
     tag="li" 
     active-class="active" 
     :to="{name: 'perfil'}">
     <a class="nav-item px-2 nav-link">Perfil</a>
     </router-link>

     <router-link
     v-show="this.$store.getters.userLogIn" 
     tag="li" 
     active-class="active" 
     :to="{name: 'registro'}">
     <a class="nav-item px-2 nav-link">Registro<!-- <span class="badge badge-info">Info</span> --></a>
     </router-link>

    <router-link
     v-show="this.$store.getters.userLogIn" 
     tag="li" 
     active-class="active" 
     :to="{name: 'traslado'}">
     <a class="nav-item px-2 nav-link">Traslado</a>
     </router-link>

     <router-link 
     tag="li" 
     active-class="active" 
     :to="{name: 'ranking'}">
     <a class="nav-item px-2 nav-link">Ranking</a>
     </router-link>

     <!-- Button trigger modal -->
     <button type="button" class="btn btn-light" data-toggle="modal" data-target="#exampleModal">
      Como jugar
     </button>

     <router-link
     v-show="this.$store.getters.userLogIn" 
     :to="{name:'home'}" 
     tag="li" 
     style="float: inline-end" class="mr-3 ml-auto">
       <a class="nav-item px-2 nav-link " @click="logOut"> Logout</a>
     </router-link>
  </ul>
  

<!-- Modal -->
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Instrucciones del juego</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <h6><strong>Escenario:</strong> </h6>
        <p>En la sección Tropas puede observar las unidades que tiene así como sus atributos.</p>
        <p>En la sección Continente puede ver el continente actual así como seleccionar al que desee ir.</p>
        <p>En la sección Movimiento puede escribir la ubicación a la que desea enviar tropas de exploración.</p>
        <p>Para explorar también puede tocar un lugar del mapa para seleccionarlo y aparecerá 
          la ubicación en la sección Movimiento en donde dice Hacia. 
          Luego seleccione las tropas que desea enviar de exploracion y luego
          presione el botón enviar.</p>
        <p>Luego de llegar las tropas de exploración al lugar indicado, se recibirá un informe que aparece 
          en la zona de Registro, donde habrá un resumen de la exploración, así como se despejará la zona oscura 
          del lugar de exploración en el mapa </p>
        <h6><strong>Perfil:</strong> </h6>
        <p>En Perfil de la barra de navegación encontrará tres secciones, en la primera podrá observar los 
          detalles de tu usuario, en la segunda sección podrá reclutar unidades, y en la tercera podrá mejorar 
          sus unidades cada ves que suba de nivel</p>
        <h6><strong>Registro:</strong> </h6>
        <p>En esta zona podra observar el registro de sus exploraciones</p>

        </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
export default {
  data: function () {
    return{     
    };
  },
  methods:{ 
    logOut(){
      this.$store.dispatch('logOut');
    }  
  }
}
</script>
<style scoped>
li a{
  color: #6b6b6b;
}
li.active>a
{
  color: #eff1f1;
}
.howPlay{
  right: 0;
}


</style>
