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
  const message = JSON.stringify(call.request, null, 2)
  const response = { message }
  respond(null, response)
}

const port = process.argv[2]
runServerOn(port)
