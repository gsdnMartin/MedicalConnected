const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmbienteSchema = new Schema({
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

module.exports = mongoose.model('Ambiente', AmbienteSchema)