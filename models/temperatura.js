const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TemperaturaSchema = new Schema({
    idDevice: String,
    idPaciente: String,
    estado: Boolean,
    lectura: Number,
    historico: [
        {
            type: Number
        }
    ]
})

module.exports = mongoose.model('Temperatura', TemperaturaSchema)