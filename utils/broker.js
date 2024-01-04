const aedes = require('aedes')()
const httpServer = require('http').createServer()
const WebSocket = require('ws')
const wsPort = 9000
var devices = []

// Here we are creating the Websocket Server that is using the HTTP Server...
const wss = new WebSocket.Server({ server: httpServer })
wss.on('connection', function connection (ws) {
  const duplex = WebSocket.createWebSocketStream(ws)
  aedes.handle(duplex)
})

httpServer.listen(wsPort, () => {
  console.log('websocket server listening on port', wsPort)
})

aedes.on('client', (client) => {
  if(!devices.includes(client.id)){
    console.log('new client', client.id)
    devices.unshift(client.id)
  }
})

aedes.on('clientError', function (client, err) {
  console.log('client error', client.id, err.message, err.stack)
})