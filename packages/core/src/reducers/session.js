import { Action } from '../constants'

const initialState = () => ({
  status: null
})

export default (state = {}, action) => {
  switch (action.type) {
    case Action.COMMAND_EXECUTED:
      const { status } = action.payload
      return { ...state, status }
    default:
      return state
  }
}
