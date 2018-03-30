import { Action } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Action.PLUGIN_LOADED:
      return handlePluginLoaded(state, action)
    default:
      return state
  }
}

function handlePluginLoaded(state, action) {
  const { palette } = action.payload
  return { ...state, ...palette }
}
