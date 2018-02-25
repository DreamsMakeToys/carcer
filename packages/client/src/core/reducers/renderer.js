import { Action } from '../constants'

const initialState = () => {
  return {}
}

export default (state = initialState(), action) => {
  switch (action.type) {
    default:
      return state
  }
}
