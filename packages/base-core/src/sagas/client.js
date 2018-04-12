import { call, spawn, take, put, select } from 'redux-saga/effects'
import { Action, ClientMessage } from '../constants'
import Client from '../services/client'
import Storage from '../services/storage'

export function* _initServer() {
  const bundle = yield call(Storage.fetchBundle)
  const channel = yield call(Client.listen, bundle)
  yield spawn(_handleMessage, channel)
}

function* _handleMessage(channel) {
  while (true) {
    const message = yield take(channel)
    switch (message.type) {
      case ClientMessage.CONNECTED:
        yield call(_handleConnected, message)
        break
      case ClientMessage.COMMAND:
        yield call(_handleCommand, message)
        break
      case ClientMessage.DISCONNECTED:
        break
      default:
        throw Error(`Unrecognized Client Message: ${message.type}`)
    }
  }
}

function* _handleConnected(message) {
  const currentSocket = yield select(state => state.client.socket)
  if (currentSocket) {
    yield call(Client.disconnect, currentSocket)
  }
  const { socket } = message.payload
  yield put({
    type: Action.CLIENT_CONNECTED,
    payload: { socket }
  })
  const palette = yield select(state => state.palette)
  yield call(Client.loadPalette, socket, palette)
}

function* _handleCommand(message) {
  yield put({
    type: Action.EXECUTE_COMMAND,
    payload: message.payload
  })
}
