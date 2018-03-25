import { merge } from 'ramda'
import { call, put, select } from 'redux-saga/effects'
import { Action } from '../constants'
import { parse, massage } from '../utils/command'
import Plugin from '../services/plugin'

function* evaluate(userInput) {
  const command = yield call(parse, userInput)
  const { config, plugin } = yield select(reduxState => {
    const config = reduxState.palette[command.name]
    const plugin = reduxState.plugins[config.target]
    return { config, plugin }
  })
  command.payload = yield call(massage, command.payload, config.fields)
  if (config.select) {
    const selectedPayload = config.select(plugin.state)
    command.payload = merge(command.payload, selectedPayload)
  }
  if (config.forward) {
    const responsePayload = yield call(
      Plugin.executeWith,
      plugin.service,
      command
    )
    command.payload = merge(command.payload, responsePayload)
  }
  const newState = plugin.reduce(plugin.state, command)
  const message = `${command.name} has resolved`
  const status = { target: plugin.name, message }
  yield put({
    type: Action.COMMAND_EXECUTED,
    payload: { status, plugin: plugin.name, state: newState }
  })
}

export default { evaluate }
