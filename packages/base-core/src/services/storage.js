import Fs from 'fs'
import BodyJS from 'raw-loader!../../assets/client-body.js'

function fetchConfig() {
  return new Promise(resolve => {
    const readOptions = { encoding: 'utf8' }
    Fs.readFile('./carcer.json', readOptions, (readError, configJSON) => {
      if (readError) throw readError
      const config = JSON.parse(configJSON)
      resolve(config)
    })
  })
}

function fetchBundle() {
  return new Promise(resolve => {
    const readOptions = { encoding: 'utf8' }
    Fs.readFile('./bundle.js', readOptions, (readError, customBundle) => {
      const bundle = customBundle || BodyJS
      resolve(bundle)
    })
  })
}

export default { fetchConfig, fetchBundle }
