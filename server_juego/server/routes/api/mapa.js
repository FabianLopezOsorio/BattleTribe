const express = require('express');
const mongoose = require('mongoose');
const Map = require('../../models/mapa');
const User = require('../../models/user');
const router = express.Router();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
router.get('/usuarios',async(req,res)=>{
    var docs=await User.find();
    res.status(200).json(docs);
});

router.post('/delete_user',async(req,res)=>{
    var docs=await User.findOneAndDelete({_id:req.body.id});
    res.status(200).json("usuario eliminado");
    console.log("Eliminado un usuario");
})
router.post('/newMap', async(req, res) => {
    const newMap = req.body;

    for (let index = 0; index < 2000; index++) {
        var map = new Map();
        map.numero = index;
        var rand = getRandomInt(0, 100);
        if (rand>80) {
            var bandits = getRandomInt(10, 100);
            map.bosques = true;
            map.bandits = bandits;
        } else if (rand >60 ) {
            var bandits = getRandomInt(100, 500);
            map.cuevas = true;
            map.bandits = bandits;
        } else if (rand >55) {
            var number = getRandomInt(1, 100);
            map.dragons = number;
            map.drag = true;
        } else if(rand>40){
            var value = getRandomInt(10, 300);
            map.tresure = value;
        }else if(rand==40){
            map.demons=1;
        }else{
            
        }
        const aaa=await map.save();
    }
    res.status(200).json("mapa creado");
    console.log("mapa creado");
});

router.get('/delete', async(req, res) => {
    var docs=await Map.deleteMany();
    res.status(200).json("mapa eliminado");
    console.log("Mapa Eliminado"); 
});


module.exports = router;