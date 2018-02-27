import { Action } from '../constants'

const initialState = {
  color: {
    hue: 0,
    saturation: 0,
    lightness: 0
  },
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
