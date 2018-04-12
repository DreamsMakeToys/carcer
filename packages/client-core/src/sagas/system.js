import { put, call } from 'redux-saga/effects'
import { Action } from '../constants'
import { _initConnection as _initBaseConnection } from './base'

function* _initCore(api) {
  yield put({
    type: Action.SYSTEM_LOADING,
    payload: api
  })
  const socket = yield call(_initBaseConnection)
  yield put({
    type: Action.SYSTEM_LOADED,
    payload: { socket }
  })
}

function* clearAlert(alert) {
  yield put({
    type: Action.CLEAR_ALERT,
    payload: { alert }
  })
}

export default { _initCore, clearAlert }
