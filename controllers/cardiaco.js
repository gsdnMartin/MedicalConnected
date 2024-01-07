const Cardiaco = require('../models/cardiaco')
const mqtt = require('mqtt');
const host = 'ws://localhost:9000'
const clientId = 'webRaspi'
const options = {clientId}

module.exports.cambiarEstado = (req, res) => {
    respuesta = req.body
    const publisher = mqtt.connect(host, options);
    publisher.on('connect', () => {
        if(respuesta.state){ publisher.publish('card', 'on');}
        else { publisher.publish('card', 'off'); }
        publisher.end()
    });
    res.end()
}

module.exports.guadarInfo = async (req, res) => {
    const resultado = await Cardiaco.find({ idPaciente: req.body.idPaciente })
    if(!resultado.length){
        const cardiaco = new Cardiaco(req.body)
        await cardiaco.save()
    }else{
        const cardiaco = await Cardiaco.findByIdAndUpdate(resultado[0]._id, { ...req.body });
        await cardiaco.save()
    }
}

module.exports.recibirInfo = async (req, res) => {
    const resultado = await Cardiaco.find({idPaciente: req.session.paciente})
    if(resultado.length===0){
        res.sendStatus(200)
    }else{
        res.send(resultado)
    }
}