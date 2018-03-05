import Fs from 'fs'
import Yaml from 'js-yaml'
import Child from 'child_process'
import createServer from 'socket.io'
import { eventChannel } from 'redux-saga'

function fetchConfig() {
  return new Promise(resolve => {
    const readOptions = { encoding: 'utf8' }
    Fs.readFile('./carcer.yaml', readOptions, (readError, data) => {
      if (readError) throw readError
      const config = Yaml.safeLoad(data)
      resolve(config)
    })
  })
}

function launch(script) {
  return new Promise(resolve => {
    const serviceProcess = Child.exec(script)
    resolve(serviceProcess)
  })
}

function createServerOn(port) {
  return new Promise(resolve => {
    const server = createServer()
    server.on('connection', socket => {
      const channel = eventChannel(emit => {
        socket.on('message', message => emit(message))
        return () => {}
      })
      resolve({ socket, channel })
    })
    server.listen(port)
  })
}

export default { fetchConfig, launch, createServerOn }
