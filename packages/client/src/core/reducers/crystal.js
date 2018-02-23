import { Action } from '../constants'
import { createColor } from '../utils/color'

const initialState = {
  color: createColor(0, 0, 0)
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Action.SET_BASE:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
