const Ambiente = require('../models/ambiente')
const mqtt = require('mqtt');
const host = 'ws://localhost:9000'
const clientId = 'webRaspi'
const options = {clientId}

module.exports.cambiarEstado = (req, res) => {
    respuesta = req.body
    const publisher = mqtt.connect(host, options);
    publisher.on('connect', () => {
        if(respuesta.state){ publisher.publish('amb', 'on');}
        else { publisher.publish('amb', 'off'); }
        publisher.end()
    });
    res.end()
}

module.exports.guadarInfo = async (req, res) => {
    const resultado = await Ambiente.find({ idPaciente: req.body.idPaciente })
    if(!resultado.length){
        const ambiente = new Ambiente(req.body)
        await ambiente.save()
    }else{
        const ambiente = await Ambiente.findByIdAndUpdate(resultado[0]._id, { ...req.body });
        await ambiente.save()
    }
}

module.exports.recibirInfo = async (req, res) => {
    const resultado = await Ambiente.find({})
    if(resultado.length==0){
        res.sendStatus(500)
    }else{
        res.send(resultado)
    }
}