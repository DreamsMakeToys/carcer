import Http from 'http'
import Fs from 'fs'
import createIO from 'socket.io'
import { eventChannel, buffers } from 'redux-saga'
import { ClientMessage, BaseMessage } from '../constants'
import ClientHTML from 'raw-loader!../../assets/index.html'
import ShellJS from 'raw-loader!../../assets/client-shell.js'

const CLIENT_PORT = 3000

function listen(bundle) {
  return new Promise(resolve => {
    const handleRequest = _handleRequest.bind(null, bundle)
    const server = Http.createServer(handleRequest)
    const clientIO = createIO(server)
    const clientChannel = eventChannel(emit => {
      clientIO.on('connection', socket => {
        socket.on('message', message => emit(message))
        socket.on('disconnect', () => {
          emit({
            type: ClientMessage.DISCONNECTED,
            payload: { socket }
          })
        })
        emit({
          type: ClientMessage.CONNECTED,
          payload: { socket }
        })
      })
      return () => {}
    }, buffers.fixed()) // RECONSIDER BUFFER STRATEGY
    server.listen(CLIENT_PORT, error => {
      if (error) throw error
      resolve(clientChannel)
    })
  })
}

function _handleRequest(bundle, request, response) {
  switch (request.url) {
    case '/':
      response.end(ClientHTML)
      return
    case '/shell.js':
      response.end(ShellJS)
      return
    case '/body.js':
      response.end(bundle)
      return
    case '/favicon.ico':
      return
    default:
      throw Error(`Invalid Client Request: ${request.url}`)
  }
}

function loadPalette(socket, palette) {
  socket.emit('message', {
    type: BaseMessage.LOAD_PALETTE,
    payload: { palette }
  })
}

function alert(socket, note) {
  socket.emit('message', {
    type: BaseMessage.ALERT,
    payload: { note }
  })
}

function disconnect(socket) {
  socket.disconnect(true)
}

export default { listen, loadPalette, alert, disconnect }
