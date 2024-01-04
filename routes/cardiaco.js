const express = require('express');
const router = express.Router();
const cardiaco = require('../controllers/cardiaco');

router.route('/estado')
    .post(cardiaco.cambiarEstado)

router.route('/guardar')
    .get(cardiaco.recibirInfo)
    .post(cardiaco.guadarInfo)

module.exports = router;
