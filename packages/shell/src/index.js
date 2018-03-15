import { h, render } from 'ink'
import { Provider } from 'ink-redux'
import createCore from '../../core/src/index.js' // TODO REMOVE HACK
import Shell from './shell'

const renderApp = store => {
  store.subscribe(() => {
    console.log(JSON.stringify(store.getState(), null, 2))
  })
  const app = (
    <Provider store={store}>
      <Shell />
    </Provider>
  )
  // console.clear()
  render(app)
}

createCore().then(renderApp)
