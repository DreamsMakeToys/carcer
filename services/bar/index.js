const { load, Server, ServerCredentials } = require('grpc')

function runServer() {
  console.log('Bar')
  const server = new Server()
  const { carcer_proto } = load('./carcer.proto')
  const { Carcer } = carcer_proto
  server.addService(Carcer.service, { connect, createChannel })
  server.bind(`0.0.0.0:${3000}`, ServerCredentials.createInsecure())
  server.start()
}

function connect(call, respond) {
  console.log('HEY')
  respond()
}

function createChannel(socket) {
  socket.on('data', message => {
    socket.write({ value: 'SERVER' })
    console.log(`Server <= ${message.value}`)
  })
  socket.on('end', () => console.log('END'))
}

runServer()
