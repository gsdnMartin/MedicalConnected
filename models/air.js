const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AirSchema = new Schema({
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

module.exports = mongoose.model('Air', AirSchema)