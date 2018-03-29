import Child from 'child_process'
import Grpc from 'grpc'
import { Root } from 'protobufjs'
import Ramda, { map } from 'ramda'
import { eventChannel } from 'redux-saga'
import SetupJSON from '../protos/setup.proto.json'

function loadWith(config) {
  Child.exec(config.script)
  return _setupWith(config).then(_bindService)
}

function _setupWith(config) {
  return new Promise(resolve => {
    const setupProto = Root.fromJSON(SetupJSON)
    const { Carcer } = Grpc.loadObject(setupProto).carcer
    const service = new Carcer(
      `localhost:${config.port}`,
      Grpc.credentials.createInsecure()
    )
    const deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 5)
    service.waitForReady(deadline, serviceError => {
      if (serviceError) throw serviceError
      service.setup({}, (requestError, response) => {
        if (requestError) throw requestError
        service.close()
        const massageWithTarget = _massage.bind(null, config.name)
        const palette = map(massageWithTarget, response.palette)
        const reducerBytes = Buffer.from(response.reducer64, 'base64')
        const reducerStr = reducerBytes.toString('ascii')
        const reducer = eval(reducerStr)({ Ramda }) // TODO ??? USE `new Function`
        const serviceProtoBytes = Buffer.from(response.protoJson64, 'base64')
        const serviceProtoStr = serviceProtoBytes.toString('ascii')
        const serviceProtoJSON = JSON.parse(serviceProtoStr)
        const serviceProto = Root.fromJSON(serviceProtoJSON)
        resolve({ port: config.port, serviceProto, palette, reducer })
      })
    })
  })
}

function _massage(target, command) {
  if (command.select) {
    command.select = eval(command.select)
  }
  return { target, ...command }
}

function _bindService({ port, palette, reducer, serviceProto }) {
  return new Promise(resolve => {
    const { Carcer } = Grpc.loadObject(serviceProto).carcer
    const service = new Carcer(
      `localhost:${port}`,
      Grpc.credentials.createInsecure()
    )
    resolve({ palette, service, reduce: reducer })
  })
}

function executeWith(service, command) {
  return new Promise(resolve => {
    const newPayload = {}
    newPayload[command.name] = command.payload
    command.payload = newPayload
    service.execute(command, (requestError, response) => {
      if (requestError) throw requestError
      resolve(response.payload[command.name])
    })
  })
}

export default { loadWith, executeWith }
