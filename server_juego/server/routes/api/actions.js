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
function rand_square() {
    var rand_sq=getRandomInt(0,1950);
    Map.findOne({numero:{$gte:rand_sq},bandits:0,dragons:0,demons:0,tresure:0,pueblo:false}).then(docs=>{
        if (docs!=null) {
            var map=docs;
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
            Map.findOneAndUpdate({number:map.numero},map).then(docs=>{
                console.log("generado nuevo cuadrado");
            })
        } else{
            console.log("El nuevo cuadrado aleatorio ya tiene algo");

        }

    })
}
router.post('/explorar', async(req, res) => {
   /*  await setTimeout(async ()=>{ */
    rand_square();
    var data = req.body;
    var usuario = {};
    var cuadrado = {};
    console.log("explorar");
    console.log(data.square);
    //Datos del usuario
    var docs2 =await User.findOne({ _id: data.user_id });
    console.log("User:");
    usuario = docs2;
    console.log(usuario);

    //Verificar si hay algun usuario en el cuadrado a explorar
    var docs =await User.findOne({ square: data.square });
        
        if (docs !== null) {
             //Combate con un usuario
             console.log("Usuario a desafiar:");
             console.log(docs.name);
            var usuario_enemigo = docs;
            var your_reg=[];
            var enmemie_reg=[];

            your_reg.push({linea:"Explorando el cuadrado: "+data.square});
            your_reg.push({linea:"Te has encontrado con el siguiente usuario: "+usuario_enemigo.name});
            enmemie_reg.push({linea:"El siguiente usuario te ha atacado: "+usuario.name});
            enmemie_reg.push({linea:"Proviene del cuadrado: "+usuario.square});
            var enemie_war_atk = docs.warriors.atk + (docs.warriors.atk * docs.atk_percent) / 100;
            var enemie_arch_atk = docs.archers.atk + (docs.archers.atk * docs.atk_percent) / 100;
            var enemies_atk = docs.warriors.value * enemie_war_atk + docs.archers.value * enemie_arch_atk;
            console.log("Ataque enemigo", enemies_atk);
            your_reg.push({linea:"Fuerza de ataque del enemigo:"+enemies_atk});
            var enemie_war_hp = docs.warriors.value * (docs.warriors.hp + (docs.warriors.hp * docs.hp_percent) / 100);
            var enemie_arch_hp = docs.archers.value * (docs.archers.hp + (docs.archers.hp * docs.hp_percent) / 100);
            var enemie_hp = enemie_war_hp + enemie_arch_hp;
            var enemie_half_hp=enemie_hp/2;
            var enemie_war_left = docs.warriors.value;
            var enemie_arch_left = docs.archers.value;
            var life_lost_enemies = 0;
            var enemie_exp = enemie_war_left * 10 + enemie_arch_left * 10;

            var war_atk = usuario.warriors.atk + (usuario.warriors.atk * usuario.atk_percent) / 100;
            var arch_atk = usuario.archers.atk + (usuario.archers.atk * usuario.atk_percent) / 100;
            var your_atk = data.warriors * war_atk + data.archers * arch_atk;
            console.log("Ataque mio", your_atk);
            enmemie_reg.push({linea:"Fuerza de ataque del enemigo: "+your_atk});
            var war_hp = data.warriors * (usuario.warriors.hp + (usuario.warriors.hp * usuario.hp_percent) / 100);
            var arch_hp = data.archers * (usuario.archers.hp + (usuario.archers.hp * usuario.hp_percent) / 100);
            var your_hp = war_hp + arch_hp;
            var your_half_hp=your_hp/2;
            var war_left = data.warriors;
            var arch_left = data.archers;
            var life_lost = 0;
            var your_exp = war_left * 10 + arch_left * 10;

            do {
                life_lost = 0;
                life_lost_enemies = 0;

                life_lost = enemies_atk;
                if (life_lost > war_hp) {
                    war_left = 0;
                    life_lost = life_lost - war_hp;
                    war_hp = 0;
                    arch_hp = arch_hp - life_lost;
                    if (arch_hp < 0) {
                        arch_hp = 0;
                    }
                    arch_left = Math.ceil(arch_hp / (usuario.archers.hp + (usuario.archers.hp * usuario.hp_percent) / 100));

                } else {
                    war_hp = war_hp - life_lost;
                    war_left = Math.ceil(war_hp / (usuario.warriors.hp + (usuario.warriors.hp * usuario.hp_percent) / 100));

                }
                console.log("warriors que quedan:", war_left);
                console.log("archers que quedan:", arch_left);
                your_hp = arch_hp + war_hp;
                console.log("Vida que queda:", your_hp);
                your_atk = war_left * war_atk + arch_left * arch_atk;

                life_lost_enemies = your_atk;
                if (life_lost_enemies > enemie_war_hp) {
                    enemie_war_left = 0;
                    life_lost_enemies = life_lost_enemies - enemie_war_hp;
                    enemie_war_hp = 0;
                    enemie_arch_hp = enemie_arch_hp - life_lost_enemies;
                    if (enemie_arch_hp < 0) {
                        enemie_arch_hp = 0;
                    }
                    enemie_arch_left = Math.ceil(enemie_arch_hp / (docs.archers.hp + (docs.archers.hp * docs.hp_percent) / 100));

                } else {
                    enemie_war_hp = enemie_war_hp - life_lost_enemies;
                    enemie_war_left = Math.ceil(enemie_war_hp / (docs.warriors.hp + (docs.warriors.hp * docs.hp_percent) / 100));

                }
                console.log("warriors que quedan del enemigo:", enemie_war_left);
                console.log("archers que quedan del enemigo:", enemie_arch_left);
                enemie_hp = enemie_arch_hp + enemie_war_hp;
                console.log("Vida que queda al enemigo:", enemie_hp);
                enemies_atk = enemie_war_left * enemie_war_atk + enemie_arch_left * enemie_arch_atk;

            } while (enemie_hp > enemie_half_hp && your_hp > your_half_hp);
            if (enemie_hp > enemie_half_hp) {
                your_reg.push({linea:"Has perdido el combate"});
                your_reg.push({linea:"Muchas de tus unidades han muerto"});
                your_reg.push({linea:"Warriors que te quedan: "+war_left});
                your_reg.push({linea:"Archers que te quedan: "+arch_left});
                enmemie_reg.push({linea:"Has ganado el combate"});
                enmemie_reg.push({linea:"Warriors que te quedan: "+enemie_war_left});
                enmemie_reg.push({linea:"Archers que te quedan: "+enemie_arch_left});
                
            } else {
                enmemie_reg.push({linea:"Has perdido el combate"});
                enmemie_reg.push({linea:"Muchas de tus unidades han muerto"});
                enmemie_reg.push({linea:"Warriors que te quedan: "+enemie_war_left});
                enmemie_reg.push({linea:"Archers que te quedan: "+enemie_arch_left});
                your_reg.push({linea:"Has ganado el combate"});
                your_reg.push({linea:"Warriors que te quedan: "+war_left});
                your_reg.push({linea:"Archers que te quedan: "+arch_left});   
            }

            var enemie_money = usuario_enemigo.money;
            var enemie_new_exp_next = usuario_enemigo.exp_next;
            var enemie_lv = usuario_enemigo.level;
            var enemie_exp_ganada = usuario_enemigo.exp;
            var enemie_point = usuario_enemigo.u_point;

            var your_money = usuario.money;
            var your_new_exp_next = usuario.exp_next;
            var your_lv = usuario.level;
            var your_exp_ganada = usuario.exp;
            var your_point = usuario.u_point;
            var your_warriors = usuario.warriors.value - (data.warriors - war_left);
            var your_archers = usuario.archers.value - (data.archers - arch_left);

            if (enemie_hp > enemie_half_hp) {
                enemie_exp_ganada = your_exp + usuario_enemigo.exp;
                do {
                    if (enemie_exp_ganada > enemie_new_exp_next) {
                        enemie_new_exp_next = enemie_new_exp_next * 2;
                        enemie_lv++;
                        enemie_point++;
                    }
                } while (enemie_exp_ganada > enemie_new_exp_next);
                enmemie_reg.push({linea:"Experiencia ganada: "+your_exp});


            } else {
                your_money = your_money + enemie_money;
                enemie_money = 0;
                your_exp_ganada = enemie_exp + usuario.exp;
                do {
                    if (your_exp_ganada > your_new_exp_next) {
                        your_new_exp_next = your_new_exp_next * 2;
                        your_lv++;
                        your_point++;
                    }
                } while (your_exp_ganada > your_new_exp_next);
                your_reg.push({linea:"Experiencia ganada: "+enemie_exp});
                your_reg.push({linea:"Dinero saqueado: "+enemie_money});

            }
            var new_enemie_reg=usuario_enemigo.registro;
            new_enemie_reg.unshift({numero:usuario.square,reg:enmemie_reg});
            var new_your_reg=usuario.registro;
            new_your_reg.unshift({numero:data.square,reg:your_reg});

            var your_new_array_reveled = usuario.map_reveled;
            var new_reveled_square = { path: 'town2.png', cuadrado: data.square };
            your_new_array_reveled.unshift(new_reveled_square);

            var enemie_new_array_reveled = usuario_enemigo.map_reveled;
            var new_reveled_square = { path: 'town2.png', cuadrado: usuario.square };
            enemie_new_array_reveled.unshift(new_reveled_square);

            const enemie_user = new User({
                _id: usuario_enemigo._id,
                name: usuario_enemigo._id.name,
                password: usuario_enemigo._id.password,
                email: usuario_enemigo._id.email,
                level: enemie_lv,
                u_point: enemie_point,
                exp: enemie_exp_ganada,
                exp_next: enemie_new_exp_next,
                warriors: { value: enemie_war_left, atk: usuario_enemigo.warriors.atk, hp: usuario_enemigo.warriors.hp },
                archers: { value: enemie_arch_left, atk: usuario_enemigo.archers.atk, hp: usuario_enemigo.archers.hp },
                hp_percent: usuario_enemigo.hp_percent,
                atk_percent: usuario_enemigo.atk_percent,
                money: enemie_money,
                map_reveled: enemie_new_array_reveled,
                registro: new_enemie_reg
            });
            var new_user1= await User.findOneAndUpdate({ _id: usuario_enemigo._id }, enemie_user, { new: true });
            console.log("Jugador enemigo actualizado", new_user1);
 
            const your_user = new User({
                _id: data.user_id,
                name: usuario.name,
                password: usuario.password,
                email: usuario.email,
                level: your_lv,
                u_point: your_point,
                exp: your_exp_ganada,
                exp_next: your_new_exp_next,
                warriors: { value: your_warriors, atk: usuario.warriors.atk, hp: usuario.warriors.hp },
                archers: { value: your_archers, atk: usuario.archers.atk, hp: usuario.archers.hp },
                hp_percent: usuario.hp_percent,
                atk_percent: usuario.atk_percent,
                money: your_money,
                map_reveled: your_new_array_reveled,
                registro: new_your_reg
            });
            var new_user2=await User.findOneAndUpdate({ _id: data.user_id }, your_user, { new: true });
            console.log("Jugador actualizado", new_user2);
            usuario = new_user2;
            res.status(200).json(usuario);
            
        }
    
    //Exploracion de un cuadrado
    if (docs == null) {
        var expCuad =await Map.findOne({ numero: data.square });
            console.log("Cuadrado:");
            console.log(expCuad);
            cuadrado = expCuad;

            var reg=[];
            var pic = '';
            reg.push({linea:"Explorando el cuadrado: "+data.square});
            //Hay combate o dinero?
            if(cuadrado.bandits!=0 || cuadrado.dragons!=0 || cuadrado.tresure>0||cuadrado.demons!=0)
            {
                
            var bandits = cuadrado.bandits;
            var dragons = cuadrado.dragons;
            var demons = cuadrado.demons;
            var enemies_atk = bandits * 10 + dragons * 3000+demons*1000000;
            console.log("Ataque enemigo", enemies_atk);
            
            var bandits_hp = bandits * 100;
            var dragons_hp = dragons * 30000;
            var demons_hp = demons * 100000000;
            var enemies_hp = bandits_hp + dragons_hp+demons_hp;
            var life_lost_enemies = 0;
            var enemies_exp = bandits * 5 + dragons * 2000+demons*10000000;
            var money = bandits * 2 + dragons * 500+demons*100000 + cuadrado.tresure;
            if (cuadrado.tresure>0) {
                reg.push({linea:"Has encontrado "+cuadrado.tresure +" de dinero"});
            } else if(demons!=0){
                reg.push({linea:"PELIGRO, te has encontrado con "+demons+ " demonio"});
                reg.push({linea:"Ataque enemigo: "+enemies_atk});
            }else{
                reg.push({linea:"En este lugar hay "+bandits+" bandidos y "+dragons+" dragones"});
                reg.push({linea:"Ataque enemigo: "+enemies_atk});
            }
            var war_atk = usuario.warriors.atk + (usuario.warriors.atk * usuario.atk_percent) / 100;
            var arch_atk = usuario.archers.atk + (usuario.archers.atk * usuario.atk_percent) / 100;
            var your_atk = data.warriors * war_atk + data.archers * arch_atk;
            console.log("Ataque mio", your_atk);
            var war_hp = data.warriors * (usuario.warriors.hp + (usuario.warriors.hp * usuario.hp_percent) / 100);
            var arch_hp = data.archers * (usuario.archers.hp + (usuario.archers.hp * usuario.hp_percent) / 100);
            var your_hp = war_hp + arch_hp;
            var war_left = data.warriors;
            var arch_left = data.archers;
            var life_lost = 0;

            do {
                life_lost = 0;
                life_lost_enemies = 0;
                life_lost_enemies = your_atk;
                if (life_lost_enemies > bandits_hp) {
                    bandits = 0;
                    life_lost_enemies = life_lost_enemies - bandits_hp;
                    bandits_hp = 0;
                    dragons_hp = dragons_hp - life_lost_enemies;
                    if (dragons_hp <= 0) { 
                        demons_hp = demons_hp + dragons_hp;
                        dragons_hp = 0;
                        if(demons_hp<=0){
                            demons=0;
                            demons_hp=0;
                        }
                        demons=Math.ceil(demons_hp / 100000000);
                    }
                    dragons = Math.ceil(dragons_hp / 30000);

                } else {
                    bandits_hp = bandits_hp - life_lost_enemies;
                    bandits = Math.ceil(bandits_hp / 100);

                }
                console.log("bandidos que quedan:", bandits);
                console.log("dragones que quedan:", dragons);
                console.log("demonios que quedan:", demons);
                enemies_hp = bandits_hp + dragons_hp+demons_hp;
                console.log("Vida que queda a los enemigos:", enemies_hp);
                enemies_atk = bandits * 10 + dragons * 1000+demons*1000000;

                life_lost = enemies_atk;
                if (life_lost > war_hp) {
                    war_left = 0;
                    life_lost = life_lost - war_hp;
                    war_hp = 0;
                    arch_hp = arch_hp - life_lost;
                    if (arch_hp < 0) {
                        arch_hp = 0;
                    }
                    arch_left = Math.ceil(arch_hp / (usuario.archers.hp + (usuario.archers.hp * usuario.hp_percent) / 100));

                } else {
                    war_hp = war_hp - life_lost;
                    war_left = Math.ceil(war_hp / (usuario.warriors.hp + (usuario.warriors.hp * usuario.hp_percent) / 100));

                }
                console.log("warriors que quedan:", war_left);
                console.log("archers que quedan:", arch_left);
                your_hp = arch_hp + war_hp;
                console.log("Vida que queda:", your_hp);
                your_atk = war_left * war_atk + arch_left * arch_atk;

            } while (enemies_hp > 0 && your_hp > 0);
            console.log("Combate finalizado");

            var dinero = 0;
            var new_money = 0;
            var new_exp = 0;
            var new_exp_next = usuario.exp_next;
            var new_level = usuario.level;
            var new_warriors = usuario.warriors.value - (data.warriors - war_left);
            var new_archers = usuario.archers.value - (data.archers - arch_left);
            var point = usuario.u_point;

            //Si ganaste el combate
            if (your_hp > 0) {
                dinero = 0;
                console.log("Dinero ganado:", money);
                new_money = usuario.money + money;
                console.log("Experiencia ganada", enemies_exp)
                new_exp = usuario.exp + enemies_exp;
                do {
                    if (new_exp > new_exp_next) {
                        new_exp_next = new_exp_next * 2;
                        new_level++;
                        point++;
                    }
                } while (new_exp > new_exp_next);
                if (cuadrado.tresure==0) {
                    reg.push({linea:"Has ganado el combate"}); 
                    reg.push({linea:"Warriors que quedan: "+war_left}); 
                    reg.push({linea:"Archers que quedan: "+arch_left}); 
                    reg.push({linea:"Dinero ganado: "+money}); 
                    reg.push({linea:"Experiencia ganada: "+enemies_exp});
                }
            } else {
                //Si perdiste el combate
                dinero = cuadrado.tresure;
                new_money = usuario.money;
                new_exp = usuario.exp;
                new_exp_next = usuario.exp_next;
                if (cuadrado.tresure==0) {
                reg.push({linea:"Has perdido el combate"});
                reg.push({linea:"Todas las unidades enviadas están muertas"});
                }             
            }
            const map = new Map({
                _id: cuadrado._id,
                numero: data.square,
                bosques: cuadrado.bosques,
                cuevas: cuadrado.cuevas,
                pueblo: cuadrado.pueblo,
                drag: cuadrado.drag,
                dragons: dragons,
                tresure: dinero,
                bandits: bandits,
                demons:demons
            });
            var update_square=await Map.findOneAndUpdate({ numero: data.square }, map);
            console.log("Update cuadrado");
                       
            if (cuadrado.bosques) {
                pic = 'bosque.png';
            } else if (cuadrado.cuevas) {
                pic = 'cueva.png';
            } else if (cuadrado.pueblo) {
                pic = 'town.png';
            } else if (cuadrado.drag) {
                pic = 'dragon.png';
            } else if (cuadrado.demons!=0) {
                pic = 'demon.png';
            }else{
                pic = 'money.png';
            }

        }else {
            //Esta vacio el cuadrado?
            reg.push({linea:"El lugar está vacio"});
            var new_level=usuario.level;
            var point=usuario.u_point;
            var new_exp=usuario.exp;
            var new_exp_next=usuario.exp_next;
            var new_warriors=usuario.warriors.value;
            var new_archers=usuario.archers.value;
            var new_money=usuario.money;
            var new_money=usuario.money;        
        }
            var new_array_reveled = usuario.map_reveled;
            var new_reveled_square = { path: pic, cuadrado: cuadrado.numero };
            new_array_reveled.unshift(new_reveled_square);

            var new_reg=usuario.registro;
            new_reg.unshift({numero:data.square,reg:reg});

            const user = new User({
                _id: data.user_id,
                name: usuario.name,
                password: usuario.password,
                email: usuario.email,
                level: new_level,
                u_point: point,
                exp: new_exp,
                exp_next: new_exp_next,
                warriors: { value: new_warriors, atk: usuario.warriors.atk, hp: usuario.warriors.hp },
                archers: { value: new_archers, atk: usuario.archers.atk, hp: usuario.archers.hp },
                hp_percent: usuario.hp_percent,
                atk_percent: usuario.atk_percent,
                money: new_money,
                map_reveled: new_array_reveled,
                registro: new_reg
            });
           var new_user3=await User.findOneAndUpdate({ _id: data.user_id }, user, { new: true });
                console.log("Jugador actualizado");
                usuario = new_user3;
                res.status(200).json(usuario);      
    }
/* },req.body.tiempo_exp); */
});

router.post('/delete_reg',async(req,res)=>{
    var data=req.body;
    var docs=await User.findOne({ _id: data.user_id });
    var usuario=docs;
    var removedItem = usuario.registro.splice(data.reg_index, 1);
    var docs2=await User.findOneAndUpdate({ _id: usuario._id }, usuario, { new: true });
    var new_usuario = docs2;
    res.status(200).json(new_usuario);
        
    
});
module.exports = router;