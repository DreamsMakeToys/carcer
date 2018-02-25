import { call, put, spawn, take } from 'redux-saga/effects'

import { Action } from '../constants'
import Renderer from '../services/renderer'

function* _initialize(api) {
  delete api._initialize

  yield put({
    type: Action.SYSTEM_LOADING,
    payload: api
  })

  yield spawn(_rendererService)
}

function* _rendererService() {
  const { channel, socket } = yield call(Renderer.initialize)

  yield put({
    type: Action.RENDERER_LOADED,
    payload: { socket }
  })

  while (true) {
    const message = yield take(channel)

    switch (message.type) {
      case 'RENDERER_CONNECTED':
        console.log(message.payload)
        break

      default:
        console.log(message)
    }
  }
}

function* evaluate(command) {
  const status = {
    severity: 'Carcer',
    message: command
  }

  yield put({
    type: Action.COMMAND_PROCESSED,
    payload: { status }
  })
}

function* setBase(color) {
  yield put({
    type: Action.SET_BASE,
    payload: { color }
  })
}

export default { _initialize, evaluate, setBase }
