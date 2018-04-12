import React, { Component } from 'react'
import { connect } from 'react-redux'
import Notify from '../widgets/notify'
import CommandForm from './commandform'
import Palette from './palette'

const App = ({
  activeCommand,
  resetActiveCommand,
  palette,
  beginExecution,
  alerts,
  clearAlert
}) => {
  let page = null
  if (activeCommand) {
    page = <CommandForm command={activeCommand} reset={resetActiveCommand} />
  } else {
    page = <Palette palette={palette} beginExecution={beginExecution} />
  }
  return (
    <div>
      {page}
      <Notify alerts={alerts} dismiss={clearAlert} />
    </div>
  )
}

const applyBehavior = Comp => {
  class Instance extends Component {
    constructor(props) {
      super(props)
      this.state = { activeCommand: null }
      this.resetActiveCommand = this.resetActiveCommand.bind(this)
      this.beginExecution = this.beginExecution.bind(this)
    }
    render() {
      const { palette, alerts, clearAlert } = this.props
      const { activeCommand } = this.state
      return (
        <Comp
          activeCommand={activeCommand}
          resetActiveCommand={this.resetActiveCommand}
          palette={palette}
          beginExecution={this.beginExecution}
          alerts={alerts}
          clearAlert={clearAlert}
        />
      )
    }
    resetActiveCommand() {
      this.setState({ activeCommand: null })
    }
    beginExecution(command) {
      if (!command.fields) {
        const { execute } = this.props
        execute({ name: command.name })
        return
      }
      this.setState({ activeCommand: command })
    }
  }
  const select = state => ({
    palette: state.palette,
    execute: state.api.execute,
    alerts: state.base.alerts,
    clearAlert: state.api.clearAlert
  })
  return connect(select)(Instance)
}

export default applyBehavior(App)
