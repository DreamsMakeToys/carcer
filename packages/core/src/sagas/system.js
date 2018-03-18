import { mapObjIndexed } from 'ramda'
import { put, all, call, spawn, take } from 'redux-saga/effects'
import { Action } from '../constants'
import Service from '../services/service'
import Storage from '../services/storage'

function* _initialize(api) {
  delete api._initialize
  yield put({
    type: Action.SYSTEM_LOADING,
    payload: api
  })
  const config = yield call(Storage.fetchConfig)
  const spawnServices = mapObjIndexed(_toServiceEffect, config)
  yield all(spawnServices)
  yield put({ type: Action.SYSTEM_LOADED }) // TODO WAIT FOR ALL SERVICES TO LOAD
}

function _toServiceEffect(config, key) {
  return spawn(_service, {
    name: key,
    ...config
  })
}

function* _service(config) {
  const { service, palette } = yield call(Service.initializeWith, config)
  yield put({
    type: Action.SERVICE_LOADED,
    payload: {
      name: config.name,
      service,
      palette
    }
  })
}

export default { _initialize }
