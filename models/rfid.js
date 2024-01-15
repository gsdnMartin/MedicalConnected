const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const rfidSchema = new Schema({
    dato: String
})

module.exports = mongoose.model('Rfid', rfidSchema)