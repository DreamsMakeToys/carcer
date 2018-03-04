import { Action } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Action.SERVICE_LOADED:
      const newState = { ...state }
      newState[action.payload.name] = action.payload
      return newState
    default:
      return state
  }
}
