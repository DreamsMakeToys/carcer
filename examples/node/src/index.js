const { load, Server, ServerCredentials } = require('grpc')

function runServerOn(port) {
  const server = new Server()
  const { carcer_proto } = load('./carcer.proto')
  const { Carcer } = carcer_proto
  server.addService(Carcer.service, { setup, createSocket })
  server.bind(`0.0.0.0:${port}`, ServerCredentials.createInsecure())
  server.start()

  function setup(call, respond) {
    const { InputType } = carcer_proto
    const response = {
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
    socket.on('data', message => {
      console.log(JSON.stringify(message.command, null, 2))
    })
    socket.on('end', () => console.log('END'))
  }
}

const servicePort = process.argv[2]
runServerOn(servicePort)