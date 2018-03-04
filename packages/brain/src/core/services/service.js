import createServer from 'socket.io'
import { eventChannel } from 'redux-saga'

function initialize() {
  return new Promise(resolve => {
    const server = createServer()
    server.on('connection', socket => {
      const channel = eventChannel(emit => {
        socket.on('message', message => emit(message))
        return () => {}
      })
      resolve({ socket, channel })
    })
    server.listen(3000)
  })
}

export default { initialize }
