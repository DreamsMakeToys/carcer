import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createClientCore from 'client-core'
import Shell from './shell'

createClientCore().then(renderClient)

function renderClient(store) {
  window.store = store // REMOVE
  const clientElement = (
    <Provider store={store}>
      <Shell />
    </Provider>
  )
  const rootContainer = document.createElement('div')
  document.body.appendChild(rootContainer)
  ReactDOM.render(clientElement, rootContainer)
}
