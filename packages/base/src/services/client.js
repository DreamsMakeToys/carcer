import createServer from 'express'

function listen() {
  return new Promise(resolve => {
    const server = createServer()
    server.get('/', (request, response) => response.send('Hello, World!'))
    server.listen(3000, () => resolve())
  })
}

export default { listen }
