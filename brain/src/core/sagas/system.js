import { mapObjIndexed } from 'ramda'
import { put, all, call, fork, spawn, take } from 'redux-saga/effects'
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
  yield put({ type: Action.SYSTEM_LOADED })
}

function _toServiceEffect(config, key) {
  return spawn(_service, {
    name: key,
    ...config
  })
}

function* _service(config) {
  const { settings, socket, channel } = yield call(
    Service.initializeWith,
    config
  )
  yield put({
    type: Action.SERVICE_LOADED,
    payload: {
      name: config.name,
      settings,
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
