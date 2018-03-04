import { Action } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Action.SYSTEM_LOADED:
      return { ...action.payload }
    default:
      return state
  }
}
