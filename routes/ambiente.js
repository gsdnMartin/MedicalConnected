const express = require('express');
const router = express.Router();
const ambiente = require('../controllers/ambiente');

router.route('/estado')
    .post(ambiente.cambiarEstado)

router.route('/guardar')
    .get(ambiente.recibirInfo)
    .post(ambiente.guadarInfo)

module.exports = router;
