const { load, Server, ServerCredentials } = require('grpc')
const palette = require('./palette')

function runServerOn(port) {
  const server = new Server()
  const { carcer_proto } = load('../../protos/carcer.proto')
  const { Carcer } = carcer_proto
  server.addService(Carcer.service, { setup, execute })
  server.bind(`0.0.0.0:${port}`, ServerCredentials.createInsecure())
  server.start()
}

function setup(call, respond) {
  const response = { palette }
  respond(null, response)
}

function execute(call, respond) {
  const { command, payload } = call.request
  let message = undefined
  switch (command) {
    case 'hello':
      const { first, last } = payload
      message = `Hello, ${first ? first.value : ''} ${last ? last.value : ''}`
      break
    default:
      message = 'Unknown command'
  }
  respond(null, { message })
}

const port = process.argv[2]
runServerOn(port)
