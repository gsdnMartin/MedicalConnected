const mqtt = require('mqtt');
const Paciente = require('../models/paciente')
const host = 'ws://localhost:9000'
const clientId = 'webRaspi'
const options = {clientId}

module.exports.cambiarEstado = async (req, res) => {
    respuesta = req.body.state
    const publisher = mqtt.connect(host, options);
    publisher.on('connect', async () => {
        if(respuesta !== 'off'){
            publisher.publish('conexion/web/searching', respuesta);
            const paciente = await Paciente.findByIdAndUpdate(req.session.paciente, { estaConectado: true })
            await paciente.save()
        }
        else { 
            publisher.publish('conexion/web/searching', 'off'); 
            const paciente = await Paciente.findByIdAndUpdate(req.session.paciente, { estaConectado: false })
            await paciente.save()
        }
        publisher.end()
    });
    res.end()
}