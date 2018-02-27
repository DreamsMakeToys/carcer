import { call, put, spawn, take } from 'redux-saga/effects'

import { Action } from '../constants'
import Renderer from '../services/renderer'
import { parse } from '../utils/command'

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
        console.log(message)
        break
      default:
        console.log(message)
    }
  }
}

function* evaluate(rawCommand) {
  let status = null
  const command = parse(rawCommand)
  try {
    switch (command.type) {
      case 'base':
        const { hue, saturation, lightness } = command.payload
        command.payload = {
          hue: Number(hue),
          saturation: Number(saturation),
          lightness: Number(lightness)
        }
        yield call(setBase, command.payload)
        break
      default:
        throw Error('Invalid Command Type')
    }
  } catch (error) {
    status = {
      severity: 'Error',
      message: error.message
    }
  }
  if (status === null)
    status = {
      severity: 'Carcer',
      message: rawCommand
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
