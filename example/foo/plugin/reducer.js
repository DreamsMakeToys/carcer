module.exports = ({ Ramda }) => {
  const initialState = () => ({
    first: 'John',
    last: 'Doe',
    greeting: undefined
  })
  return (state = initialState(), command) => {
    switch (command.name) {
      case 'register':
        const { first, last } = command.fields
        return Ramda.merge(state, { first, last })
      case 'greet':
        const { greeting } = command.fields
        const greetingLens = Ramda.lensProp('greeting')
        return Ramda.set(greetingLens, greeting, state)
      default:
        return state
    }
  }
}
