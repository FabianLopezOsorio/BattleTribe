const mongoose = require('mongoose');
const mapSchema = mongoose.Schema({
    numero: Number,
    bosques: { default: false, type: Boolean },
    cuevas: { default: false, type: Boolean },
    pueblo: { default: false, type: Boolean },
    drag: { default: false, type: Boolean },
    dragons: { default: 0, type: Number },
    tresure: { default: 0, type: Number },
    bandits: { default: 0, type: Number },
    demons: { default: 0, type: Number },

});
module.exports = mongoose.model('Map', mapSchema);