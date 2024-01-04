const mqtt = require('mqtt');
const { spaw, spawn } = require('child_process')

const host = 'ws://localhost:9000'
const clientId = 'raspi'

const options = { clientId }

const pub = mqtt.connect(host, options);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

pub.subscribe('response');
pub.subscribe('temp');
pub.subscribe('spo2');
pub.subscribe('card');
pub.subscribe('air');
pub.subscribe('amb');
pub.subscribe('hum');
pub.subscribe('touch');

var temperatureState = true
var spo2State = true
var cardiacoState = true
var airState = false
var ambienteState = true
var humedadState = true

function sendData(topic, dato, state){
    pub.publish(topic, JSON.stringify({
        "idDevice": 123,
        "idPaciente": 1,
        "estado": state,
        "lectura": dato,
    }))
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
    while (true) {
        if (temperatureState) {
            pythonExecute('temp.py', i, 'temperatura/guardar')
        } else {
            sendData('temperatura/guardar', -1, false)
        }
        if (spo2State) {
            pythonExecute('spo2.py', i, 'spo2/guardar')
        } else {
            sendData('spo2/guardar', -1, false)
        }
        if (cardiacoState) {
            pythonExecute('spo2.py', i-1, 'cardiaco/guardar')
        } else {
            sendData('cardiaco/guardar', -1, false)
        }
        if (airState) {
            pythonExecute('spo2.py', i+1, 'air/guardar')
        } else {
            sendData('air/guardar', -1, false)
        }
        if (ambienteState) {
            pythonExecute('temp.py', i-2, 'ambiente/guardar')
        } else {
            sendData('ambiente/guardar', -1, false)
        }
        if (humedadState) {
            pythonExecute('temp.py', i+2, 'humedad/guardar')
        } else {
            sendData('humedad/guardar', -1, false)
        }
        pythonExecute('touch.py', i, 'touch/alert')
        i++
        await sleep(2000);
    }
});

pub.on('message', (topic, message) => {
    if (topic === 'temp' && message.toString() === 'on') {
        temperatureState = true
    }
    else if (topic === 'temp' && message.toString() === 'off') {
        temperatureState = false
    }
    else if (topic === 'spo2' && message.toString() === 'on') {
        spo2State = true
    }
    else if (topic === 'spo2' && message.toString() === 'off') {
        spo2State = false
    }
    else if (topic === 'card' && message.toString() === 'on') {
        cardiacoState = true
    }
    else if (topic === 'card' && message.toString() === 'off') {
        cardiacoState = false
    }
    else if (topic === 'air' && message.toString() === 'on') {
        airState = true
    }
    else if (topic === 'air' && message.toString() === 'off') {
        airState = false
    }
    else if (topic === 'amb' && message.toString() === 'on') {
        ambienteState = true
    }
    else if (topic === 'amb' && message.toString() === 'off') {
        ambienteState = false
    }
    else if (topic === 'hum' && message.toString() === 'on') {
        humedadState = true
    }
    else if (topic === 'hum' && message.toString() === 'off') {
        humedadState = false
    }
});

pub.on('error', (error) => {
    console.error('Error publishing or receiving message:', error);
    pub.end()
});
