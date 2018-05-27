import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommandForm from './commandform'
import Palette from './palette'

const App = ({ activeCommand, resetActiveCommand, palette, beginExecution }) =>
  activeCommand ? (
    <CommandForm command={activeCommand} reset={resetActiveCommand} />
  ) : (
    <Palette palette={palette} beginExecution={beginExecution} />
  )

const applyBehavior = Comp => {
  class Instance extends Component {
    constructor(props) {
      super(props)
      this.state = { activeCommand: null }
      this.resetActiveCommand = this.resetActiveCommand.bind(this)
      this.beginExecution = this.beginExecution.bind(this)
    }
    render() {
      const { palette } = this.props
      const { activeCommand } = this.state
      return (
        <Comp
          activeCommand={activeCommand}
          resetActiveCommand={this.resetActiveCommand}
          palette={palette}
          beginExecution={this.beginExecution}
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
    execute: state.api.execute
  })
  return connect(select)(Instance)
}

export default applyBehavior(App)
