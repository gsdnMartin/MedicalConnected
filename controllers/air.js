const { response } = require('express');
const Air = require('../models/air')
const mqtt = require('mqtt');
const host = 'ws://localhost:9000'
const clientId = 'webRaspi' 
const options = {clientId}

module.exports.cambiarEstado = (req, res) => {
    respuesta = req.body
    console.log(req.body)
    const publisher = mqtt.connect(host, options);
    publisher.on('connect', () => {
        if(respuesta.state){ publisher.publish('air', 'on');}
        else { publisher.publish('air', 'off'); }
        publisher.end()
    });
    res.end()
}

module.exports.guadarInfo = async (req, res) => {
    const resultado = await Air.find({ idPaciente: req.body.idPaciente })
    if(!resultado.length){
        const air = new Air(req.body)
        await air.save()
    }else{
        const air = await Air.findByIdAndUpdate(resultado[0]._id, { ...req.body });
        await air.save()
    } 
}

module.exports.recibirInfo = async (req, res) => {
    const resultado = await Air.find({})
    res.send(resultado)
}