import { call, put, spawn, take } from 'redux-saga/effects'

import { Action } from '../constants'

function* _initialize(api) {
  delete api._initialize

  yield put({
    type: Action.SYSTEM_LOADING,
    payload: api
  })
}

function* setBase(color) {
  yield put({
    type: Action.SET_BASE,
    payload: { color }
  })
}

export default { _initialize, setBase }
