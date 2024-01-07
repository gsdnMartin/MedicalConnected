const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PacienteSchema = new Schema({
    Nombre: String,
    Apellido: String,
    Edad: Number,
    Sexo: String,
    FechaNacimiento: Date,
    Direccion: String,
    Ocupacion: String,
    NumeroContacto: String,
    MedicoResponsable: String,
    GrupoSanguineo: String,
    Alergias: String,
    EnfermedadesCronicas: String,
    MotivoIngreso: String,
    Habitacion: {
        type: String,
        unique: true
    },
    estaConectado: Boolean,
    Hospital: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Paciente', PacienteSchema)