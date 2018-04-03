import { Action } from '../constants'

export default (state = {}, action) => {
  switch (action.type) {
    case Action.SYSTEM_LOADING:
      return handleSystemLoading(state, action)
    default:
      return state
  }
}

function handleSystemLoading(state, action) {
  const api = action.payload
  return { ...api }
}
