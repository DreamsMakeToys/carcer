import { merge } from 'ramda'
import { put, actionChannel, take, call, select } from 'redux-saga/effects'
import { Action } from '../constants'
import { massage } from '../utils/command'
import Plugin from '../services/plugin'
import Client from '../services/client'

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
    const { config, plugin } = yield select(reduxState => {
      const config = reduxState.palette[command.name]
      const plugin = reduxState.plugins[config.target]
      return { config, plugin }
    })
    command.fields = yield call(massage, command.fields, config.fields)
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
    const note = `"${command.name}" has resolved`
    const socket = yield select(state => state.client.socket)
    yield call(Client.alert, socket, note)
  }
}

export default { execute }
