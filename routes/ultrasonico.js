const express = require('express');
const router = express.Router();
const ultra = require('../controllers/ultrasonico');

router.route('/alert')
    .get(ultra.enviarAlerta)
    .post(ultra.recibirAlerta)

module.exports = router;