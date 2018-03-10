const { load, Server, ServerCredentials } = require('grpc')

function runServer() {
  console.log('Bar')
  const server = new Server()
  const { carcer_proto } = load('./carcer.proto')
  const { Carcer } = carcer_proto
  server.addService(Carcer.service, { setup, createSocket })
  server.bind(`0.0.0.0:${3000}`, ServerCredentials.createInsecure())
  server.start()

  function setup(call, respond) {
    const { InputType } = carcer_proto
    const response = {
      name: 'Bar',
      palette: {
        hello: {
          fields: {
            name: InputType.STRING
          }
        }
      }
    }
    respond(null, response)
  }

  function createSocket(socket) {
    socket.on('data', message => console.log(message))
    socket.on('end', () => console.log('END'))
  }
}

runServer()
