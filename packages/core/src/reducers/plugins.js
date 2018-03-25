import { set, lensProp } from 'ramda'
import { Action } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Action.PLUGIN_LOADED:
      return handlePluginLoaded(state, action)
    case Action.COMMAND_EXECUTED:
      return handleCommandExecuted(state, action)
    default:
      return state
  }
}

function handlePluginLoaded(reduxState, action) {
  const { name, state, reduce, service } = action.payload
  const nameLens = lensProp(name)
  return set(nameLens, { name, state, reduce, service }, reduxState)
}

function handleCommandExecuted(reduxState, action) {
  const { plugin, state } = action.payload
  const pluginState = reduxState[plugin]
  const stateLens = lensProp('state')
  const newPluginState = set(stateLens, state, pluginState)
  const pluginLens = lensProp(plugin)
  return set(pluginLens, newPluginState, reduxState)
}
