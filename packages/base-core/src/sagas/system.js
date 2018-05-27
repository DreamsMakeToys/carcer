import { put, call, spawn } from 'redux-saga/effects'
import { Action } from '../constants'
import { _initPlugins } from './plugin'
import { _processCommands as _commandProcessor } from './command'
import { _initServer as _initClientServer } from './client'

function* _initCore(api) {
  yield put({
    type: Action.SYSTEM_LOADING,
    payload: api
  })
  yield call(_initPlugins)
  yield spawn(_commandProcessor)
  yield call(_initClientServer)
  yield put({ type: Action.SYSTEM_LOADED })
}

export default { _initCore }
