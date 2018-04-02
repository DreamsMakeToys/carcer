import React from 'react'
import ReactDOM from 'react-dom'
import { Toolbar, ToolbarRow, ToolbarTitle } from 'rmwc'
import './global.css'

const root = document.createElement('div')
document.body.appendChild(root)
ReactDOM.render(
  <div className="mdc-typography">
    <Toolbar>
      <ToolbarRow>
        <ToolbarTitle>Carcer</ToolbarTitle>
      </ToolbarRow>
    </Toolbar>
  </div>,
  root
)
