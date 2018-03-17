import Child from 'child_process'
import Grpc from 'grpc'
import { map } from 'ramda'
import { eventChannel } from 'redux-saga'
let Proto = null // TODO GENERATE STATICALLY

function initializeWith(config) {
  return new Promise(resolve => {
    const serviceProcess = Child.exec(config.script)
    const { carcer_proto } = Grpc.load('../../protos/carcer.proto') // TODO REMOVE HACK
    Proto = carcer_proto // TODO REMOVE HACK
    const service = new Proto.Carcer(
      `localhost:${config.port}`,
      Grpc.credentials.createInsecure()
    )
    const deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 5)
    service.waitForReady(deadline, serviceError => {
      service.setup(new Proto.InitialRequest(), (requestError, response) => {
        const insertTarget = _insert.bind(null, config.name)
        const palette = map(insertTarget, response.palette)
        resolve({ service, palette })
      })
    })
  })
}

function _insert(target, command) {
  return { target, ...command }
}

function executeWith(service, command) {
  return new Promise(resolve => {
    service.execute(command, (requestError, response) => {
      resolve(response)
    })
  })
}

export default { initializeWith, executeWith }
