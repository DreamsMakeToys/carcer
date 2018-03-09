import Grpc from 'grpc'
import Child from 'child_process'
import { eventChannel } from 'redux-saga'
import { BrainRequest } from '../carcer_pb'
import { CarcerClient } from '../carcer_grpc_pb'

function initializeWith(config) {
  return new Promise(resolve => {
    const serviceProcess = Child.exec(config.script)
    const service = new CarcerClient(
      `localhost:${config.port}`,
      Grpc.credentials.createInsecure()
    )
    const deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 5)
    service.waitForReady(deadline, error => {
      service.connect(new BrainRequest(), error => {
        const socket = service.createChannel()
        const channel = eventChannel(emit => {
          socket.on('data', message => emit(message))
          return () => {}
        })
        resolve({ socket, channel })
      })
    })
  })
}

export default { initializeWith }
