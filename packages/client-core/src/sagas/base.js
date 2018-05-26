import { call, spawn, take, put } from 'redux-saga/effects'
import { BaseMessage, Action } from '../constants'
import Base from '../services/base'

export function* _initConnection() {
  const { socket, channel } = yield call(Base.connect)
  yield spawn(_handleBase, channel)
  return socket
}

function* _handleBase(channel) {
  while (true) {
    const message = yield take(channel)
    switch (message.type) {
      case BaseMessage.LOAD_PALETTE:
        yield call(_handleLoadPalette, message)
        break
      case BaseMessage.DISCONNECTED:
        break
      default:
        throw Error(`Unrecognized Base Message: ${message.type}`)
    }
  }
}

function* _handleLoadPalette(message) {
  const { palette } = message.payload
  yield put({
    type: Action.LOAD_PALETTE,
    payload: { palette }
  })
}
