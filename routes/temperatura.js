const express = require('express');
const router = express.Router();
const temperatura = require('../controllers/temperatura');

router.route('/estado')
    .post(temperatura.cambiarEstado)

router.route('/guardar')
    .get(temperatura.recibirInfo)
    .post(temperatura.guadarInfo)

module.exports = router;
