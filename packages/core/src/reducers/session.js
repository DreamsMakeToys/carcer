import { Action } from '../constants'

const initialState = () => ({
  status: null
})

export default (state = {}, action) => {
  switch (action.type) {
    case Action.COMMAND_EXECUTED:
      return handleCommandExecuted(state, action)
    default:
      return state
  }
}

function handleCommandExecuted(state, action) {
  const { status } = action.payload
  return { ...state, status }
}
