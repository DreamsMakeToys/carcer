import { map } from 'ramda'
import { all, call, put } from 'redux-saga/effects'
import { Action } from '../constants'
import Plugin from '../services/plugin'

export function* _initPlugins() {
  const pluginPaths = yield call(Plugin.fetchPaths)
  const pluginsLoaded = map(_loadEffect, pluginPaths)
  yield all(pluginsLoaded)
}

function _loadEffect(pluginPath) {
  return call(_loadPlugin, pluginPath)
}

function* _loadPlugin(path) {
  const config = yield call(Plugin.loadConfig, path)
  const { palette, reduce } = yield call(Plugin.loadCore, path, config)
  const state = reduce(undefined, { name: 'INIT_PLUGIN_STATE' })
  let service = undefined
  if (config.service) {
    service = yield call(Plugin.loadService, path, config)
  }
  yield put({
    type: Action.PLUGIN_LOADED,
    payload: {
      name: config.name,
      palette,
      reduce,
      state,
      service
    }
  })
}
