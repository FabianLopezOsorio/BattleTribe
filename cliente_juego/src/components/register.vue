<template>
  <div class="container">      
     
     <div class="form-group">
         <label id="name">Name:</label>
         <input type="text"  id="name" v-model="name">
         <br>
         <label id="pass">Password:</label>
         <input type="password"  id="pass" v-model="password">
         <br>
         <label id="email">Email:</label>
         <input type="text"  id="email" v-model="email">
         <br>
         <p style="color:white">{{mess}}</p>
         <button class="btn btn-success center" @click="register">Register</button>
     </div>     
  </div>
</template>

<script>
import Axios from '@/service/api';
export default {
  data: function () {
    return{
      name:"",
      password:"",
      email:"",
      mess:""
    };
  },
  methods:{
    register: function () {
      if (this.name!=="" && this.password!=="" && this.email!=="") {
        Axios().post("post/register/",{
          name:this.name,
          password:this.password,
          email:this.email
       }).then(docs=>{
         if (docs.data.value==2) {
           this.mess="The user already exist";
         } else {
           this.mess="You was succesfully register";   
           setTimeout(() => {
             this.$router.push({name:"home"});
           }, 3000);        
         }
         
       });
      }
      this.name="";
      this.password="";
      this.email=""; 
      
    }
  }
}
</script>

<style scoped>
.container{
    text-align: center;
}
.form-group{
    background-color: rgb(78, 77, 77);
    padding: 5%;
    margin-top: 10px;
}
.form-group label{
    color: rgb(255, 255, 255);
    width: 10%;
}
.form-group input{
    width: 30%;
}
.form-group label,.form-group input{
    margin-top: 4px;
}
</style>
