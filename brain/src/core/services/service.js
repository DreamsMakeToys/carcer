import Grpc from 'grpc'
import Child from 'child_process'
import { eventChannel } from 'redux-saga'
import { BrainRequest } from '../protos/carcer_pb'
import { CarcerClient } from '../protos/carcer_grpc_pb'

function initializeWith(config) {
  return new Promise(resolve => {
    const serviceProcess = Child.exec(config.script)
    const service = new CarcerClient(
      `localhost:${config.port}`,
      Grpc.credentials.createInsecure()
    )
    const deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 5)
    service.waitForReady(deadline, serviceError => {
      service.setup(new BrainRequest(), (requestError, response) => {
        const settings = response.toObject()
        const socket = service.createSocket()
        const channel = eventChannel(emit => {
          socket.on('data', message => emit(message))
          return () => {}
        })
        resolve({ settings, socket, channel })
      })
    })
  })
}

export default { initializeWith }
