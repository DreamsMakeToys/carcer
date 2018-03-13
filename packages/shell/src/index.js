import { h, render } from 'ink'
import { Provider } from 'ink-redux'
import createCore from 'carcer-core'
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
