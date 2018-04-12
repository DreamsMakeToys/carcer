import { Action } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Action.LOAD_PALETTE:
      return handleLoadPalette(state, action)
    default:
      return state
  }
}

function handleLoadPalette(state, action) {
  const { palette } = action.payload
  return { ...state, ...palette }
}
