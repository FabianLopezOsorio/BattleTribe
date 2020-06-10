const express = require('express');
const mongoose = require('mongoose');
const Map = require('../../models/mapa');
const User = require('../../models/user');
const router = express.Router();

router.post('/move',async(req,res)=>{
    console.log("Un usuario se quiere mudar");
    var data=req.body;
    var docs =await Map.findOne({numero:data.m_square});
        if(docs.bandits==0 && docs.dragons==0 && docs.pueblo==false){

            //Actualizar cuadrado nuevo del usuario
            docs.pueblo=true;
            var new_map= await Map.findOneAndUpdate({ numero: data.m_square }, docs);
            console.log("Usuario mudado");
            

            //Actualizar cuadrado actual del usuario
            var cuad= await Map.findOne({numero:data.user_square});
            cuad.pueblo=false;
            const new_map2= await Map.findOneAndUpdate({ numero: data.user_square }, cuad);
            console.log("Antiguo pueblo ha sido abandonado");
    
            //Actualizar datos del usuario
            var usuario= await User.findOne({_id:data.id});
            usuario.map_reveled.unshift({ path: 'town.png', cuadrado: data.m_square });
            usuario.map_reveled.unshift({ path: '', cuadrado: usuario.square });
            usuario.square=data.m_square;
            var new_user= await User.findOneAndUpdate({_id:usuario._id},usuario);
            console.log("Datos del usurio actualizado");
            res.status(200).send("Te has mudado.");
                
            
        }else{
            console.log("La ubicación ya esta ocupada");
            res.status(200).send("La ubicación ya está ocupada");
        }

   
})

module.exports = router;