import { mapObjIndexed } from 'ramda'
import { put, all, call, fork, spawn, take } from 'redux-saga/effects'
import { Action } from '../constants'
import Service from '../services/service'

function* _initialize(api) {
  delete api._initialize
  yield put({
    type: Action.SYSTEM_LOADING,
    payload: api
  })
  const config = yield call(Service.fetchConfig)
  const spawnServices = mapObjIndexed(_toServiceEffect, config)
  yield all(spawnServices)
  yield put({ type: Action.SYSTEM_LOADED })
}

function _toServiceEffect(config, key) {
  return spawn(_service, {
    name: key,
    ...config
  })
}

function* _service(config) {
  const serviceProcess = yield call(Service.launch, config.script)
  const { socket, channel } = yield call(Service.createServerOn, config.port)
  yield put({
    type: Action.SERVICE_LOADED,
    payload: {
      name: config.name,
      socket
    }
  })
  yield fork(_handleMessage, channel)
}

function* _handleMessage(channel) {
  while (true) {
    const message = yield take(channel)
    console.log(message)
  }
}

export default { _initialize }
