const express = require('express');
const router = express.Router();
const touch = require('../controllers/touch');

router.route('/alert')
    .get(touch.enviarAlerta)
    .post(touch.recibirAlerta)

module.exports = router;