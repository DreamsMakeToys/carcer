import { Action } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Action.SERVICE_LOADED:
      const { service } = action.payload
      const serviceState = { service }
      const newState = { ...state }
      newState[action.payload.name] = serviceState
      return newState
    default:
      return state
  }
}
