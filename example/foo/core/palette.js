export default {
  register: {
    fields: {
      first: { type: 'STRING' },
      last: { type: 'STRING' }
    }
  },
  greet: {
    select: state => ({
      first: state.first,
      last: state.last
    }),
    forward: true
  }
}
