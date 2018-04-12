import createSocket from 'socket.io-client'
import { eventChannel } from 'redux-saga'
import { ClientMessage } from '../constants'
import { BaseMessage } from '../../../base-core/src/constants'

function connect() {
  return new Promise(resolve => {
    const socket = createSocket()
    const channel = eventChannel(emit => {
      // socket.on('connection', () => {})
      socket.on('message', message => emit(message))
      // socket.on('disconnect', () => {})
      return () => {}
    })
    resolve({ socket, channel })
  })
}

function execute(socket, command) {
  return new Promise(resolve => {
    socket.emit('message', {
      type: ClientMessage.COMMAND,
      payload: command
    })
  })
}

export default { connect, execute }
