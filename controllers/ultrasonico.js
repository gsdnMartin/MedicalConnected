const Ultrasonico = require('../models/ultrasonico')

module.exports.recibirAlerta = async (req, res) => {
    const resultado = await Ultrasonico.find({ idPaciente: req.body.idPaciente })
    if(!resultado.length){
        const ultra = new Ultrasonico(req.body)
        await ultra.save()
    }else{
        const ultra = await Ultrasonico.findByIdAndUpdate(resultado[0]._id, { ...req.body });
        await ultra.save()
    }
}

module.exports.enviarAlerta = async (req, res) => {
    const resultado = await Ultrasonico.find({idPaciente: req.session.paciente})
    if(resultado.length===0){
        res.sendStatus(200)
    }else{
        if(resultado[0].lectura == 0){
            resultado[0].estado = false
        }
        res.send(resultado)
    }
}