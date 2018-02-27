import { Action, ConnectionStatus } from '../constants'

const initialState = () => ({
  connection: ConnectionStatus.DISCONNECTED
})

export default (state = initialState(), action) => {
  switch (action.type) {
    case Action.RENDERER_LOADED:
      return { ...state, ...action.payload }
    case Action.CONNECTION_CHANGED:
      return { ...state, ...action.payload }
    default:
      return state
  }
}
