import { h, render } from 'ink'
import { Provider } from 'ink-redux'
import createBaseCore from '../../base-core/src/index.js' // TODO REMOVE HACK => "base-core"
import Shell from './shell'

createBaseCore().then(renderBase)

function renderBase(store) {
  const baseElement = (
    <Provider store={store}>
      <Shell />
    </Provider>
  )
  console.clear()
  render(baseElement)
}
