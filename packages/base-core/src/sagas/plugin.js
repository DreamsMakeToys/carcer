import { mapObjIndexed } from 'ramda'
import { all, call, put } from 'redux-saga/effects'
import { Action } from '../constants'
import Plugin from '../services/plugin'

export function* _initPlugins(config) {
  const pluginsLoaded = mapObjIndexed(_load, config.plugins)
  yield all(pluginsLoaded)
}

function _load(config, key) {
  return call(_loadPlugin, {
    name: key,
    ...config
  })
}

function* _loadPlugin(config) {
  const { service, reduce, palette } = yield call(Plugin.load, config)
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
