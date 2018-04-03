import { put } from 'redux-saga/effects'
import { Action } from '../constants'

function* _initialize(api) {
  delete api._initialize
  yield put({
    type: Action.SYSTEM_LOADING,
    payload: api
  })
}

export default { _initialize }
