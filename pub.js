const mqtt = require('mqtt');
const { spaw, spawn } = require('child_process')

const host = 'ws://localhost:9000'
const clientId = 'raspi'

const options = {clientId}

const pub = mqtt.connect(host, options);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

pub.subscribe('response');
pub.subscribe('temp');
pub.subscribe('spo2');
pub.subscribe('air');

var temperatureState = true
var spo2State = true
var airState = false

pub.on('connect', async () => {
    console.log('Publisher connected');
    i = 0
    while (true){
        if (temperatureState) {
            const code = spawn('python3', ['temp.py',i])
            code.stdout.on('data', (data) => {
                msgOld = data.toString()
                temperatureData = msgOld.slice(0,-1)
                pub.publish('temperatura/guardar', JSON.stringify({
                    "idDevice": 123,
                    "idPaciente": 1,
                    "estado": temperatureState,
                    "lectura": temperatureData,
                }))
            })
        }else{
            pub.publish('temperatura/guardar', JSON.stringify({
                "idDevice": 123,
                "idPaciente": 1,
                "estado": temperatureState,
                "lectura": -1,
            }))
        }
        if (spo2State) {
            const code = spawn('python3', ['spo2.py',i])
            code.stdout.on('data', (data) => {
                msgOld = data.toString()
                spo2Data = msgOld.slice(0,-1)
                pub.publish('spo2/guardar', JSON.stringify({
                    "idDevice": 123,
                    "idPaciente": 1,
                    "estado": true,
                    "lectura": spo2Data,
                }))
            })
        }else{
            pub.publish('spo2/guardar', JSON.stringify({
                "idDevice": 123,
                "idPaciente": 1,
                "estado": spo2State,
                "lectura": -1,
            }))
        }
        if (airState) {
            const code = spawn('python3', ['spo2.py',i])
            code.stdout.on('data', (data) => {
                msgOld = data.toString()
                airData = msgOld.slice(0,-1)
                pub.publish('air/guardar', JSON.stringify({
                    "idDevice": 123,
                    "idPaciente": 1,
                    "estado": true,
                    "lectura": airData,
                }))
            })
        }else{
            pub.publish('air/guardar', JSON.stringify({
                "idDevice": 123,
                "idPaciente": 1,
                "estado": airState,
                "lectura": -1,
            }))
        }
        i++      
        await sleep(2000);
    }
});

//Respond to messages received on the response topic
pub.on('message', (topic, message) => {
    if(topic === 'temp' && message.toString() === 'on'){
        temperatureState = true
    }
    else if(topic === 'temp' && message.toString() === 'off'){
        temperatureState = false
    }
    else if(topic === 'spo2' && message.toString() === 'on'){
        spo2State = true
    }
    else if(topic === 'spo2' && message.toString() === 'off'){
        spo2State = false
    }
    else if(topic === 'air' && message.toString() === 'on'){
        airState = true
    }
    else if(topic === 'air' && message.toString() === 'off'){
        airState = false
    }
});

pub.on('close', () => {
    console.log(clientId + ' disconnected')
})

pub.on('error', (error) => {
    console.error('Error publishing or receiving message:', error);
    pub.end()
});
