import { append, reduce } from 'ramda'
import { Action } from '../constants'

const initialState = () => ({
  socket: null,
  alerts: []
})

export default (state = initialState(), action) => {
  switch (action.type) {
    case Action.SYSTEM_LOADED:
      return handleSystemLoaded(state, action)
    case Action.ALERT:
      return handleAlert(state, action)
    case Action.CLEAR_ALERT:
      return handleClearAlert(state, action)
    default:
      return state
  }
}

function handleSystemLoaded(state, action) {
  const { socket } = action.payload
  return { ...state, socket }
}

function handleAlert(state, action) {
  const { alert } = action.payload
  const alerts = append(alert, state.alerts)
  return { ...state, alerts }
}

function handleClearAlert(state, action) {
  const { alert } = action.payload
  const removeAlert = (result, value) => {
    if (value === alert) return result
    result.push(value)
    return result
  }
  const alerts = reduce(removeAlert, [], state.alerts)
  return { ...state, alerts }
}
