const express = require('express');
const mongoose = require('mongoose');
const Map = require('../../models/mapa');
const User = require('../../models/user');
const router = express.Router();
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/juego", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conected to database');
}).catch(() => {
    console.log('Error no connection to db');
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
router.post('/login', async(req, res) => {
    const userData = req.body;
    var data=await User.findOne({ name: userData.name, password: userData.password });
        if(data==null){
            console.log("Nombre de usuario o contraseña incorrecta");
        }else{
            console.log("El usuario "+userData.name+" se ha logeado");
        }
        res.status(201).json(data);
   
});
router.post('/register', async(req, res) => {
    const userData = req.body;
    console.log(userData);
    var new_square = getRandomInt(0, 1900);

    var data=await User.findOne({ name: userData.name });
        if (data == null) {
            var docs1=await Map.findOne({ numero: {$gte:new_square},pueblo:false });
            if (docs1!=null) {
                var new_map = docs1;
                new_map.cuevas = false;
                new_map.drag = false;
                new_map.bosques = false;
                new_map.pueblo = true;
                new_map.bandits = 0;
                new_map.dragons = 0;
                new_map.demons = 0;
            var docs=await Map.findOneAndUpdate({ numero: new_square }, new_map, { new: true });
            console.log("Update cuadrado",docs);
                
            const user = new User({
                name: userData.name,
                password: userData.password,
                email: userData.email,
                level: 0,
                u_point: 0,
                exp: 0,
                exp_next: 100,
                warriors: { value: 10, atk: 10, hp: 200 },
                archers: { value: 10, atk: 20, hp: 100 },
                hp_percent: 0,
                atk_percent: 0,
                money: 100,
                square: new_square,
                map_reveled: [{ path: 'town.png', cuadrado: new_square }],
                registro:[]
            });
            user.save();
            console.log("Usuario registrado");
            res.send({ value: 1 });
            } else {
                console.log("cuadrado ocupado por un usuario");
                res.send({ value: 2 });
            }
               
        } else {
            console.log("Usuario q ya existe");
            res.send({ value: 2 });
        }
});
router.post('/recruit', async(req, res) => {
    const data = req.body;
    var docs1=await User.findOne({ _id: data.user_id });
    var usuario = docs1;
    usuario.money = usuario.money - data.dinero;
    usuario.warriors.value += parseInt(data.warriors);
    usuario.archers.value += parseInt(data.archers);
    var docs=await User.findOneAndUpdate({ _id: data.user_id }, usuario, { new: true });
    console.log("reclutamiento actualizado");
    res.status(200).json(docs);
});

router.post('/upgrade', async(req, res) => {
    const data = req.body;
    var docs1=await User.findOne({ _id: data.user_id });
    var usuario = docs1;
    usuario.hp_percent += parseInt(data.hp_mod);
    usuario.atk_percent += parseInt(data.atk_mod);
    usuario.u_point -= parseInt(data.points_spent);
    var docs= await User.findOneAndUpdate({ _id: data.user_id }, usuario, { new: true });
    console.log("upgrade realizado");
    res.status(200).json(docs);
})
module.exports = router;