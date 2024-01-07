const Paciente = require('../models/paciente');
const User = require('../models/user');


module.exports.renderPacientes = async (req, res) => {
    const user = await User.find({username: req.session.passport.user}).populate({
        path: 'pacientes',
        populate: {
            path: 'Nombre'
        }
    }).populate('pacientes');
    res.render('users/pacientes', {user});
}

module.exports.renderRegistro = (req, res) => {
    res.render('users/pacientesForm');
}

module.exports.register = async (req, res, next) => {
    const user = await User.find({username: req.session.passport.user});
    const paciente = new Paciente(req.body);
    paciente.Hospital = user[0]._id;
    paciente.estaConectado = false
    user[0].pacientes.push(paciente);
    await paciente.save(); 
    await user[0].save();
    req.flash('success', 'Paciente Registrado!');
    res.redirect('/pacientes');
}

module.exports.showEditar = async (req, res, next) => {
    const user = await Paciente.findById(req.params.id);
    res.render('users/pacientesEdit', {user});
}

module.exports.editarPaciente = async (req, res, next) => {
    const { id } = req.params;
    const paciente = await Paciente.findByIdAndUpdate(id, req.body);
    await paciente.save()
    req.flash('success', 'Paciente Actualizado!');
    res.redirect('/pacientes')
}

module.exports.eliminar = async (req, res, next) => {
    const { id } = req.params;
    await Paciente.findByIdAndDelete(id);
    req.flash('success', 'Paciente Eliminado!')
    res.redirect('/pacientes');
}