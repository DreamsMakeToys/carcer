const { Root } = require('protobufjs')
const { loadObject, Server, ServerCredentials } = require('grpc')
FooProto = require('./protobuf.json')

function runServerOn(port) {
  const fooProto = Root.fromJSON(FooProto)
  const { Carcer } = loadObject(fooProto).carcer
  const server = new Server()
  server.addService(Carcer.service, { execute })
  server.bind(`0.0.0.0:${port}`, ServerCredentials.createInsecure())
  server.start()
}

function execute(call, respond) {
  const { name, payload } = call.request
  switch (name) {
    case 'greet':
      const { first, last } = payload.greet
      const greeting = `Hello, ${first} ${last}`
      respond(null, { payload: { greet: { greeting } } })
      return
    default:
      throw Error('Unknown Command')
  }
}

const port = process.argv[2]
runServerOn(port)
