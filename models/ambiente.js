const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AmbienteSchema = new Schema({
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

module.exports = mongoose.model('Ambiente', AmbienteSchema)