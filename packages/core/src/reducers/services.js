import { Action } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Action.SERVICE_LOADED:
      const { socket } = action.payload
      const serviceState = { socket }
      const newState = { ...state }
      newState[action.payload.name] = serviceState
      return newState
    default:
      return state
  }
}
