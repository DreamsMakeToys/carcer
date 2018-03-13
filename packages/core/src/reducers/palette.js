import { Action } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Action.SERVICE_LOADED:
      const { palette } = action.payload
      return { ...state, ...palette }
    default:
      return state
  }
}
