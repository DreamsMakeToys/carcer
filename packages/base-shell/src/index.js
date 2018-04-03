import { h, render } from 'ink'
import { Provider } from 'ink-redux'
import createBaseCore from '../../base-core/src/index.js' // TODO REMOVE HACK
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

createBaseCore().then(renderApp)
