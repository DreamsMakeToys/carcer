const { load, Server, ServerCredentials } = require('grpc')
const palette = require('./palette')

function runServerOn(port) {
  const server = new Server()
  const { carcer_proto } = load('./carcer.proto')
  const { Carcer } = carcer_proto
  server.addService(Carcer.service, { setup, createSocket })
  server.bind(`0.0.0.0:${port}`, ServerCredentials.createInsecure())
  server.start()
}

function setup(call, respond) {
  const response = { palette }
  respond(null, response)
}

function createSocket(socket) {
  socket.on('data', message => {
    console.log(JSON.stringify(message.command, null, 2))
  })
  socket.on('end', () => console.log('END'))
}

const port = process.argv[2]
runServerOn(port)
