import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import createClientCore from '../../client-core/src/index.js' // TODO REMOVE HACK => "client-core"
import Shell from './crystals/shell'
import './global.css'

createClientCore().then(renderClient)

function renderClient(store) {
  const clientElement = (
    <Provider store={store}>
      <Shell />
    </Provider>
  )
  const rootContainer = document.createElement('div')
  document.body.appendChild(rootContainer)
  ReactDOM.render(clientElement, rootContainer)
}
