import Fs from 'fs'
import Yaml from 'js-yaml'

function fetchConfig() {
  return new Promise(resolve => {
    const readOptions = { encoding: 'utf8' }
    Fs.readFile('./carcer.yaml', readOptions, (readError, data) => {
      const config = Yaml.safeLoad(data)
      resolve(config)
    })
  })
}

export default { fetchConfig }
