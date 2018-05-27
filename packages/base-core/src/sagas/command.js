import { merge, map } from 'ramda'
import { put, actionChannel, take, call, select } from 'redux-saga/effects'
import { Action } from '../constants'
import { massage } from '../utils/command'
import Plugin from '../services/plugin'

function* execute(command) {
  yield put({
    type: Action.EXECUTE_COMMAND,
    payload: command
  })
}

export function* _processCommands() {
  const commandChannel = yield actionChannel(Action.EXECUTE_COMMAND)
  while (true) {
    const action = yield take(commandChannel)
    const command = action.payload
    const { config, plugin, rootState } = yield select(reduxState => {
      const config = reduxState.palette[command.name]
      const plugin = reduxState.plugins[config.target]
      const rootState = map(_plugin => _plugin.state, reduxState.plugins)
      return { config, plugin, rootState }
    })
    command.fields = yield call(
      massage,
      config.fields,
      rootState,
      command.fields
    )
    if (config.select) {
      const selectedFields = config.select(plugin.state)
      command.fields = merge(command.fields, selectedFields)
    }
    if (config.forward) {
      const responseFields = yield call(
        Plugin.executeWith,
        plugin.service,
        command
      )
      command.fields = merge(command.fields, responseFields)
    }
    const newState = plugin.reduce(plugin.state, command)
    yield put({
      type: Action.COMMAND_EXECUTED,
      payload: { plugin: plugin.name, state: newState }
    })
  }
}

export default { execute }
