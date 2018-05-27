import { append, reduce } from 'ramda'
import { Action } from '../constants'

const initialState = () => ({
  socket: null
})

export default (state = initialState(), action) => {
  switch (action.type) {
    case Action.SYSTEM_LOADED:
      return handleSystemLoaded(state, action)
    default:
      return state
  }
}

function handleSystemLoaded(state, action) {
  const { socket } = action.payload
  return { ...state, socket }
}
