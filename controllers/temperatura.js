const Temperatura = require('../models/temperatura')
const mqtt = require('mqtt');
const host = 'ws://localhost:9000'
const clientId = 'webRaspi'
const options = {clientId}

module.exports.cambiarEstado = (req, res) => {
    respuesta = req.body
    console.log(respuesta)
    const publisher = mqtt.connect(host, options);
    publisher.on('connect', () => {
        if(respuesta.state){ publisher.publish('temp', 'on');}
        else { publisher.publish('temp', 'off'); }
        publisher.end()
    });
    res.end()
}

module.exports.guadarInfo = async (req, res) => {
    const resultado = await Temperatura.find({ idPaciente: req.body.idPaciente })
    if(!resultado.length){
        const temperatura = new Temperatura(req.body)
        await temperatura.save()
    }else{
        const temperatura = await Temperatura.findByIdAndUpdate(resultado[0]._id, { ...req.body });
        await temperatura.save()
    }
}

module.exports.recibirInfo = async (req, res) => {
    const resultado = await Temperatura.find({})
    if(resultado.length==0){
        res.sendStatus(500)
    }else{
        res.send(resultado)
    }
}