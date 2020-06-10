const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    name: String,
    password: String,
    email: String,
    level: Number,
    u_point: Number,
    exp: Number,
    exp_next: Number,
    warriors: { value: Number, atk: Number, hp: Number },
    archers: { value: Number, atk: Number, hp: Number },
    hp_percent: Number,
    atk_percent: Number,
    money: Number,
    square: Number,
    map_reveled: [{ path: String, cuadrado: Number }],
    registro:[
        {numero:Number, 
         reg:[{linea:String}]
        } 
    ]
});
module.exports = mongoose.model('User', userSchema);