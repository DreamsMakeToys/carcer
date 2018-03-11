import Child from 'child_process'
import Grpc from 'grpc'
import { map } from 'ramda'
import { eventChannel } from 'redux-saga'

function initializeWith(config) {
  return new Promise(resolve => {
    const serviceProcess = Child.exec(config.script)
    const { carcer_proto } = Grpc.load('../../../brain/dist/carcer.proto') // TODO HACK
    const { Carcer, BrainRequest } = carcer_proto
    const service = new Carcer(
      `localhost:${config.port}`,
      Grpc.credentials.createInsecure()
    )
    const deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 5)
    service.waitForReady(deadline, serviceError => {
      service.setup(new BrainRequest(), (requestError, response) => {
        const insertTarget = _insert.bind(null, config.name)
        const palette = map(insertTarget, response.palette)
        const socket = service.createSocket()
        const channel = eventChannel(emit => {
          socket.on('data', message => emit(message))
          return () => {}
        })
        resolve({ palette, socket, channel })
      })
    })
  })
}

function _insert(target, command) {
  return { target, ...command }
}

export default { initializeWith }
