module.exports = () => ({
  register: {
    fields: {
      first: 'STRING',
      last: 'STRING'
    }
  },
  greet: {
    select: state => ({
      first: state.first,
      last: state.last
    }),
    forward: true
  }
})
