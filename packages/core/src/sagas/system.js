import Ramda, { mapObjIndexed } from 'ramda'
import { put, all, call, take } from 'redux-saga/effects'
import { Action } from '../constants'
import Plugin from '../services/plugin'
import Storage from '../services/storage'

function* _initialize(api) {
  delete api._initialize
  yield put({
    type: Action.SYSTEM_LOADING,
    payload: api
  })
  const config = yield call(Storage.fetchConfig)
  const pluginsLoaded = mapObjIndexed(_loadPluginWith, config)
  yield all(pluginsLoaded)
  yield put({ type: Action.SYSTEM_LOADED })
}

function _loadPluginWith(config, key) {
  return call(_pluginWith, {
    name: key,
    ...config
  })
}

function* _pluginWith(config) {
  const { service, reduce, palette } = yield call(Plugin.loadWith, config)
  const state = reduce(undefined, { name: 'INIT_PLUGIN_STATE' })
  yield put({
    type: Action.PLUGIN_LOADED,
    payload: {
      name: config.name,
      state,
      reduce,
      palette,
      service
    }
  })
}

export default { _initialize }
