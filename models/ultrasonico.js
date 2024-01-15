const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UltrasonicoSchema = new Schema({
    idDevice: String,
    idPaciente: String,
    estado: Boolean,
    lectura: Number
})

module.exports = mongoose.model('Ultrasonico', UltrasonicoSchema)