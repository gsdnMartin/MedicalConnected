const express = require('express');
const router = express.Router();
const air = require('../controllers/air');

router.route('/estado')
    .post(air.cambiarEstado)

router.route('/guardar')
    .get(air.recibirInfo)
    .post(air.guadarInfo)

module.exports = router;