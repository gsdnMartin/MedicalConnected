const mqtt = require('mqtt');
const host = 'ws://localhost:9000'
const clientId = 'test'
const options = { clientId }

const pub = mqtt.connect(host, options);

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

pub.on('connect', async () => {
    pub.publish('rfid/alert', JSON.stringify({
        //"dato": '-1',
        //"dato": '65a1e1af829cae64cfc000b8',
        "dato": '65a1e387829cae64cfc001e1',
    }))
});

pub.on('message', (topic, message) => {

})

pub.on('error', (error) => {
    console.error('Error publishing or receiving message:', error);
    pub.end()
});