import { mergeAll, map } from 'ramda'
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import sagas from './sagas'

const createCore = () => {
  const sagaMiddleware = createSagaMiddleware()
  const store = createStore(reducer, applyMiddleware(sagaMiddleware))
  const api = createApi(sagaMiddleware.run, sagas)

  return api._initialize(api).then(() => store)
}

const createApi = (runSaga, sagas) => {
  const apiSagas = mergeAll(sagas)
  const sagaToPromise = bindSaga.bind(null, runSaga)

  return map(sagaToPromise, apiSagas)
}

const bindSaga = (runSaga, saga) => {
  const boundSaga = runSaga.bind(null, saga)

  return (...args) => boundSaga(...args).done
}

export default createCore
