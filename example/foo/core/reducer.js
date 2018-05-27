import * as Ramda from 'ramda'

const initialState = () => ({
  first: 'John',
  last: 'Doe',
  greeting: undefined
})

export default (state = initialState(), command) => {
  switch (command.name) {
    case 'register':
      return handleRegister(state, command)
    case 'greet':
      return handleGreet(state, command)
    default:
      return state
  }
}

function handleRegister(state, command) {
  const { merge } = Ramda
  const { first, last } = command.fields
  return merge(state, { first, last })
}

function handleGreet(state, command) {
  const { lensProp, set } = Ramda
  const { greeting } = command.fields
  const greetingLens = lensProp('greeting')
  return set(greetingLens, greeting, state)
}
