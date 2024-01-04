const Humedad = require('../models/humedad')
const mqtt = require('mqtt');
const host = 'ws://localhost:9000'
const clientId = 'webRaspi'
const options = {clientId}

module.exports.cambiarEstado = (req, res) => {
    respuesta = req.body
    const publisher = mqtt.connect(host, options);
    publisher.on('connect', () => {
        if(respuesta.state){ publisher.publish('hum', 'on');}
        else { publisher.publish('hum', 'off'); }
        publisher.end()
    });
    res.end()
}

module.exports.guadarInfo = async (req, res) => {
    const resultado = await Humedad.find({ idPaciente: req.body.idPaciente })
    if(!resultado.length){
        const humedad = new Humedad(req.body)
        await humedad.save()
    }else{
        const humedad = await Humedad.findByIdAndUpdate(resultado[0]._id, { ...req.body });
        await humedad.save()
    }
}

module.exports.recibirInfo = async (req, res) => {
    const resultado = await Humedad.find({})
    if(resultado.length==0){
        res.sendStatus(500)
    }else{
        res.send(resultado)
    }
}