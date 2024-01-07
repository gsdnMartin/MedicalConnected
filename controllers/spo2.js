const { response } = require('express');
const Spo2 = require('../models/spo2')
const mqtt = require('mqtt');
const host = 'ws://localhost:9000'
const clientId = 'webRaspi' 
const options = {clientId}

module.exports.cambiarEstado = (req, res) => {
    respuesta = req.body
    const publisher = mqtt.connect(host, options);
    publisher.on('connect', () => {
        if(respuesta.state){ publisher.publish('spo2', 'on');}
        else { publisher.publish('spo2', 'off'); }
        publisher.end()
    });
    res.end()
}

module.exports.guadarInfo = async (req, res) => {
    const resultado = await Spo2.find({ idPaciente: req.body.idPaciente })
    if(!resultado.length){
        const spo2 = new Spo2(req.body)
        await spo2.save()
    }else{
        const spo2 = await Spo2.findByIdAndUpdate(resultado[0]._id, { ...req.body });
        await spo2.save()
    } 
}

module.exports.recibirInfo = async (req, res) => {
    const resultado = await Spo2.find({idPaciente: req.session.paciente})
    if(resultado.length===0){
        res.sendStatus(200)
    }else{
        res.send(resultado)
    }
}