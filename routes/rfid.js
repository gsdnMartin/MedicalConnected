const express = require('express');
const router = express.Router();
const rfid = require('../controllers/rfid');

router.route('/estado')
    .post(rfid.cambiarEstado)

router.route('/alert')
    .get(rfid.recibirInfo)
    .post(rfid.guadarInfo)
    
module.exports = router;