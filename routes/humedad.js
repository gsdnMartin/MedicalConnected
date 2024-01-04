const express = require('express');
const router = express.Router();
const humedad = require('../controllers/humedad');

router.route('/estado')
    .post(humedad.cambiarEstado)

router.route('/guardar')
    .get(humedad.recibirInfo)
    .post(humedad.guadarInfo)

module.exports = router;
