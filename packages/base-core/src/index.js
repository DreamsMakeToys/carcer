import createCore from 'create-core'
import reducer from './reducers'
import sagas from './sagas'

export default createCore.bind(null, reducer, sagas)
