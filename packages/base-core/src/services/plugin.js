import Fs from 'fs'
import Child from 'child_process'
import Grpc from 'grpc'
import glob from 'glob'
import { Root } from 'protobufjs'
import { mapObjIndexed } from 'ramda'

function executeWith(service, command) {
  return new Promise(resolve => {
    const { name, fields } = command
    const commandPayload = {}
    commandPayload[name] = fields
    const commandMessage = { name, payload: commandPayload }
    service.execute(commandMessage, (requestError, response) => {
      if (requestError) throw requestError
      resolve(response.payload[command.name])
    })
  })
}

function fetchPaths() {
  return new Promise(resolve => {
    glob('./plugins/*', (globError, paths) => {
      resolve(paths)
    })
  })
}

function loadConfig(path) {
  return new Promise(resolve => {
    const onRead = (readError, pluginJSON) => {
      if (readError) throw readError
      const plugin = JSON.parse(pluginJSON)
      resolve(plugin)
    }
    const readOptions = { encoding: 'utf8' }
    Fs.readFile(`${path}/plugin.json`, readOptions, onRead)
  })
}

function loadCore(path, config) {
  return new Promise(resolve => {
    const onRead = (readError, bundle) => {
      if (readError) throw readError
      const loadScript = `return ${bundle}`
      const load = new Function(loadScript)
      const core = load()
      const injectTarget = _inject.bind(null, config.name)
      const palette = mapObjIndexed(injectTarget, core.palette)
      resolve({ palette, reduce: core.reduce })
    }
    const readOptions = { encoding: 'utf8' }
    Fs.readFile(`${path}/core.js`, readOptions, onRead)
  })
}

function _inject(target, command, name) {
  return { name, target, ...command }
}

function loadService(path, config) {
  const startService = _startService.bind(null, path, config)
  return _loadProtobuf(path)
    .then(startService)
    .then(_waitForService)
}

function _startService(path, config, protobuf) {
  const startService = `cd ${path} && ${config.service.start}`
  Child.exec(startService, execError => {
    if (execError) throw execError
  })
  const protobufObj = Root.fromJSON(protobuf)
  const { Carcer } = Grpc.loadObject(protobufObj).carcer
  const service = new Carcer(
    `localhost:${config.service.port}`,
    Grpc.credentials.createInsecure()
  )
  return service
}

function _waitForService(service) {
  return new Promise(resolve => {
    const deadline = new Date()
    deadline.setSeconds(deadline.getSeconds() + 5)
    service.waitForReady(deadline, serviceError => {
      if (serviceError) throw serviceError
      resolve(service)
    })
  })
}

function _loadProtobuf(path) {
  return new Promise(resolve => {
    const onRead = (readError, protobufJSON) => {
      if (readError) throw readError
      const protobuf = JSON.parse(protobufJSON)
      resolve(protobuf)
    }
    const readOptions = { encoding: 'utf8' }
    Fs.readFile(`${path}/protobuf.json`, readOptions, onRead)
  })
}

export default {
  executeWith,
  fetchPaths,
  loadConfig,
  loadCore,
  loadService
}
