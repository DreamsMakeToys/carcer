import { h, render } from 'ink'
import { Provider } from 'ink-redux'
import createCore from '../../base/src/index.js' // TODO REMOVE HACK
import Shell from './shell'

const renderApp = store => {
  const app = (
    <Provider store={store}>
      <Shell />
    </Provider>
  )
  console.clear()
  render(app)
}

createCore().then(renderApp)
