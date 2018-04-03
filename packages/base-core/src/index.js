import createCore from '../../create-core/src/index.js' // TODO REMOVE HACK
import reducer from './reducers'
import sagas from './sagas'

export default createCore.bind(null, reducer, sagas)
