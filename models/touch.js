const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TouchSchema = new Schema({
    idDevice: String,
    idPaciente: String,
    estado: Boolean,
    lectura: Number
})

module.exports = mongoose.model('Touch', TouchSchema)