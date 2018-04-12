import { Action } from '../constants'

const initialState = () => ({
  socket: null
})

export default (state = initialState(), action) => {
  switch (action.type) {
    case Action.CLIENT_CONNECTED:
      return handleClientConnected(state, action)
    default:
      return state
  }
}

function handleClientConnected(state, action) {
  const { socket } = action.payload
  return { ...state, socket }
}
