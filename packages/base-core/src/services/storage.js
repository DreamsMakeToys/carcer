import Fs from 'fs'
import Yaml from 'js-yaml'
import BodyJS from 'raw-loader!../../assets/client-body.js'

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
