import { Action } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Action.SYSTEM_LOADING:
      return { ...action.payload }

    default:
      return state
  }
}
