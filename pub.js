const fs = require('fs');
const mqtt = require('mqtt');
const { spaw, spawn } = require('child_process');
const host = 'ws://localhost:9000'
const clientId = 'raspi'
const options = { clientId }

const pub = mqtt.connect(host, options);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

var defaultConf = {
    idDevice: 'Habitacion 1',
    idPaciente: null,
    conexion: false,
    temperatureState : false,
    temperaturaSendOff: true,
    spo2State : false,
    spo2SendOff: true,
    cardiacoState : false,
    cardiacoSendOff: true,
    airState : false,
    airSendOff: true,
    ambienteState : false,
    ambienteSendOff: true,
    humedadState : false,
    humedadSendOff: true
};

pub.subscribe('conexion/web/searching');
pub.subscribe('temp');
pub.subscribe('spo2');
pub.subscribe('card');
pub.subscribe('air');
pub.subscribe('amb');
pub.subscribe('hum');
pub.subscribe('touch');

function initializing(){
    defaultConf = fs.readFileSync("test.json");
}

function writeData(){
    fs.writeFileSync("test.json",JSON.stringify(defaultConf))
}

function sendData(topic, dato, state){
    if(defaultConf.idPaciente !== null){
        pub.publish(topic, JSON.stringify({
                "idDevice": defaultConf.idDevice,
                "idPaciente": defaultConf.idPaciente,
                "estado": state,
                "lectura": dato,
            }))
    }
    console.log(topic, dato, defaultConf.idPaciente)
}

function pythonExecute(file, i, topic) {
    const code = spawn('python3', [file, i])
    code.stdout.on('data', (data) => {
        msgOld = data.toString()
        dato = msgOld.slice(0, -1)
        sendData(topic, dato, true)
    })
}

pub.on('connect', async () => {
    i = 0
    //initializing()
    while(true){
        if(!defaultConf.conexion){
            defaultConf.idPaciente !== null ? defaultConf.conexion = true : defaultConf.conexion = false
            await sleep(2000);
        }
        else{
            if (defaultConf.temperatureState) {
                pythonExecute('temp.py', i, 'temperatura/guardar')
                defaultConf.temperaturaSendOff = true
            } else if(defaultConf.temperaturaSendOff){
                sendData('temperatura/guardar', -1, false)
                defaultConf.temperaturaSendOff = false
            }
            if (defaultConf.spo2State) {
                pythonExecute('spo2.py', i, 'spo2/guardar')
                defaultConf.spo2SendOff = true
            } else if(defaultConf.spo2SendOff){
                sendData('spo2/guardar', -1, false)
                defaultConf.spo2SendOff = false
            }
            if (defaultConf.cardiacoState) {
                pythonExecute('spo2.py', i-1, 'cardiaco/guardar')
                defaultConf.cardiacoSendOff = true
            } else if(defaultConf.cardiacoSendOff){
                sendData('cardiaco/guardar', -1, false)
                defaultConf.cardiacoSendOff = false
            }
            if (defaultConf.airState) {
                pythonExecute('spo2.py', i+1, 'air/guardar')
                defaultConf.airSendOff = true
            } else if(defaultConf.airSendOff){
                sendData('air/guardar', -1, false)
                defaultConf.airSendOff = false
            }
            if (defaultConf.ambienteState) {
                pythonExecute('temp.py', i-2, 'ambiente/guardar')
                defaultConf.ambienteSendOff = true
            } else if(defaultConf.ambienteSendOff){
                sendData('ambiente/guardar', -1, false)
                defaultConf.ambienteSendOff = false
            }
            if (defaultConf.humedadState) {
                pythonExecute('temp.py', i+2, 'humedad/guardar')
                defaultConf.humedadSendOff = true
            } else if(defaultConf.humedadSendOff){
                sendData('humedad/guardar', -1, false)
                defaultConf.humedadSendOff = false
            }
            pythonExecute('touch.py', i, 'touch/alert')
            i++
            await sleep(2000);
        } 
    }
});

pub.on('message', (topic, message) => {
    if (topic === 'conexion/web/searching') {
        if(message.toString() !== 'off' && defaultConf.conexion === false){
            defaultConf.idPaciente=message.toString()
            defaultConf.conexion = true
        }
        if(message.toString() === 'off' && defaultConf.conexion === true){
            sendData('temperatura/guardar', -1, false)
            sendData('spo2/guardar', -1, false)
            sendData('cardiaco/guardar', -1, false)
            sendData('air/guardar', -1, false)
            sendData('ambiente/guardar', -1, false)
            sendData('humedad/guardar', -1, false)
            sendData('touch/alert', -1, false)
            defaultConf.idPaciente = null
            defaultConf.conexion = false
        }
    }
    else if (topic === 'temp' && message.toString() === 'on') {
        defaultConf.temperatureState = true
    }
    else if (topic === 'temp' && message.toString() === 'off') {
        defaultConf.temperatureState = false
    }
    else if (topic === 'spo2' && message.toString() === 'on') {
        defaultConf.spo2State = true
    }
    else if (topic === 'spo2' && message.toString() === 'off') {
        defaultConf.spo2State = false
    }
    else if (topic === 'card' && message.toString() === 'on') {
        defaultConf.cardiacoState = true
    }
    else if (topic === 'card' && message.toString() === 'off') {
        defaultConf.cardiacoState = false
    }
    else if (topic === 'air' && message.toString() === 'on') {
        defaultConf.airState = true
    }
    else if (topic === 'air' && message.toString() === 'off') {
        defaultConf.airState = false
    }
    else if (topic === 'amb' && message.toString() === 'on') {
        defaultConf.ambienteState = true
    }
    else if (topic === 'amb' && message.toString() === 'off') {
        defaultConf.ambienteState = false
    }
    else if (topic === 'hum' && message.toString() === 'on') {
        defaultConf.humedadState = true
    }
    else if (topic === 'hum' && message.toString() === 'off') {
        defaultConf.humedadState = false
    }
    
});

pub.on('error', (error) => {
    console.error('Error publishing or receiving message:', error);
    pub.end()
});


/*
const fs = require('fs');


let defaultConf = {
    idDevice: 'Habitacion 1',
    idPaciente: null,
    estado: false,
    temperatureState : false,
    spo2State : false,
    cardiacoState : false,
    airState : false,
    ambienteState : false,
    humedadState : false
};

fs.writeFileSync("test.json",JSON.stringify(defaultConf))
*/