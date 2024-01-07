const express = require('express');
const router = express.Router();
const dispositivo = require('../controllers/dispositivo');

router.route('/estado')
    .post(dispositivo.cambiarEstado)

module.exports = router;
