const express = require('express');
const router = express.Router();
const spo2 = require('../controllers/spo2');

router.route('/estado')
    .post(spo2.cambiarEstado)

router.route('/guardar')
    .get(spo2.recibirInfo)
    .post(spo2.guadarInfo)

module.exports = router;