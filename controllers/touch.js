const Touch = require('../models/touch')


module.exports.recibirAlerta = async (req, res) => {
    const resultado = await Touch.find({ idPaciente: req.body.idPaciente })
    if(!resultado.length){
        const touch = new Touch(req.body)
        await touch.save()
    }else{
        const touch = await Touch.findByIdAndUpdate(resultado[0]._id, { ...req.body });
        await touch.save()
    }
}

module.exports.enviarAlerta = async (req, res) => {
    const resultado = await Touch.find({})
    if(resultado.length==0){
        res.send(500)
    }else{
        if(resultado[0].lectura == 0){
            resultado[0].estado = false
        }
        res.send(resultado)
    }
}