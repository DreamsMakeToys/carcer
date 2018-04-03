import createServer from 'express'
import ClientHTML from 'raw-loader!../../assets/index.html'
import ClientJS from 'raw-loader!../../assets/client.js'

function listen() {
  return new Promise(resolve => {
    const server = createServer()
    server.get('/', (request, response) => response.send(ClientHTML))
    server.get('/client.js', (request, response) => response.send(ClientJS))
    server.listen(3000, () => resolve())
  })
}

export default { listen }
