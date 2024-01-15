const mqtt = require('mqtt');
const Paciente = require('../models/paciente');
const Rfid = require('../models/rfid');
const host = 'ws://localhost:9000'
const clientId = 'rfid' 
const options = {clientId}

module.exports.cambiarEstado = (req, res) => {
    respuesta = req.body
    const publisher = mqtt.connect(host, options);
    publisher.on('connect', () => {
        publisher.publish('rfid', respuesta.id);
        publisher.end()
    });
    res.end()
}

module.exports.guadarInfo = async (req, res) => {
    const resultado = await Rfid.find({})
    if(!resultado.length){
        const rfid = new Rfid(req.body)
        await rfid.save()
    }else{
        const rfid = await Rfid.findOneAndUpdate(req.body)
        await rfid.save()
    }
    res.redirect('/rfid/alert')
    res.end()
}

module.exports.recibirInfo = async (req, res) => {
    try{
        const resultado = await Rfid.find({})
        const id = resultado[0].dato 
        if(id !== '-1'){
            const paciente = await Paciente.findById(id)
            res.send(paciente)
        }else{
            res.sendStatus(203)
        }
    }catch(e){
        console.log(e)
    }
}
