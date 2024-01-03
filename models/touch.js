const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TouchSchema = new Schema({
    idDevice: Number,
    idPaciente: Number,
    estado: Boolean,
    lectura: Number
})

module.exports = mongoose.model('Touch', TouchSchema)