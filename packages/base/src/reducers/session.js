import { Action } from '../constants'

const initialState = () => ({
  name: 'Carcer',
  description: 'a mechanism for projection',
  status: null
})

export default (state = initialState(), action) => {
  switch (action.type) {
    case Action.SYSTEM_LOADED:
      return handleSystemLoaded(state, action)
    case Action.COMMAND_EXECUTED:
      return handleCommandExecuted(state, action)
    default:
      return state
  }
}

function handleSystemLoaded(state, action) {
  const { config } = action.payload
  const { name, description } = config
  return { ...state, name, description }
}

function handleCommandExecuted(state, action) {
  const { status } = action.payload
  return { ...state, status }
}
