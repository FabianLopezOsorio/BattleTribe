<template>
  <div class="container">      
    <section>
    <div class="container">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <div class="card">
            <div class="card-header">
              <h4>Account Login</h4>
            </div>
            <div class="card-body">
              <div >
                <div class="form-group">
                  <label >Nombre</label>
                  <input type="text" v-model="name" class="form-control">
                </div>
                <div class="form-group">
                  <label >Password</label>
                  <input type="password" v-model="password" class="form-control">
                </div>
                <br>
                <p >{{error}}</p>
                <br>
                <button class="btn btn-primary btn-block" @click="login" >Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
      
  </div>
</template>

<script>
import Axios from '@/service/api';
export default {
  data: function () {
    return{
      name:"",
      password:"",
      error:""
    };
  },
  methods:{
    login: function () {
      if (this.name!=="" && this.password!=="") {
        Axios().post("post/login/",{
          name:this.name,
          password:this.password
       }).then(docs=>{
         if (docs.data==null) {
           this.error="Nombre de usuario o contraseña incorrecto";
         } else {
           this.$store.dispatch("login",docs.data);
           this.$router.push({name:"escenario"});
           }
       });
      }
      this.name="";
      this.password="";   
      
    }
  }
}
</script>

<style scoped>
.container{
    text-align: center;
    margin-top: 2%;
}
p{
  color: aliceblue;
}

</style>
