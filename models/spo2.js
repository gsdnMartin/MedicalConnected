const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Spo2Schema = new Schema({
    idDevice: Number,
    idPaciente: Number,
    estado: Boolean,
    lectura: Number,
    historico: [
        {
            type: Number
        }
    ]
})

module.exports = mongoose.model('Spo2', Spo2Schema)