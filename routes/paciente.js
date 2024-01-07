const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const paciente = require('../controllers/paciente');

router.route('/')
    .get(paciente.renderPacientes)

router.route('/registrar')
    .get(paciente.renderRegistro)
    .post(catchAsync(paciente.register));

router.route('/edit/:id')
    .get(paciente.showEditar)
    .put(paciente.editarPaciente);

router.route('/:id')
    .delete(paciente.eliminar);

module.exports = router;