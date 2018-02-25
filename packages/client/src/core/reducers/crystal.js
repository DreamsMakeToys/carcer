import { Action } from '../constants'
import { createColor } from '../utils/color'

const initialState = {
  color: createColor(0, 0, 0),
  status: {
    severity: 'Carcer',
    message: 'a toy for projection'
  }
}

export default (state = initialState, action) => {
  switch (action.type) {
    case Action.SET_BASE:
      return { ...state, ...action.payload }

    case Action.COMMAND_PROCESSED:
      return { ...state, ...action.payload }

    default:
      return state
  }
}
