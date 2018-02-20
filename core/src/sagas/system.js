import { call, fork, put, take } from 'redux-saga/effects'

import { Action } from '../constants'
import Command from '../services/command'

function* _initialize(api) {
  delete api._initialize

  yield put({
    type: Action.SYSTEM_LOADING,
    payload: api
  })

  const commandChannel = yield call(Command.createChannel)

  yield fork(_handleCommand, commandChannel)
}

function* _handleCommand(channel) {
  while (true) {
    const message = yield take(channel)

    switch (message) {
      case 'WILL_MOUNT':
        const post = global.postToHost
        delete global.postToHost
        delete global._postToCore // ref is held on the native side

        yield put({
          type: Action.MOUNT_COMMAND_SERVICE,
          payload: { post }
        })

        post('DID_MOUNT')

      default:
        // TODO: evaluate message
        break
    }
  }
}

function* setBase(color) {
  yield put({
    type: Action.SET_BASE,
    payload: { color }
  })
}

export default { _initialize, setBase }
