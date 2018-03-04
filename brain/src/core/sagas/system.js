import { put } from 'redux-saga/effects'
import { Action } from '../constants'

function* _initialize(api) {
  delete api._initialize
  yield put({
    type: Action.SYSTEM_LOADED,
    payload: api
  })
}

export default { _initialize }
