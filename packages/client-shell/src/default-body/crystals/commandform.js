import { reduce } from 'ramda'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, TextFieldHelperText, Button } from 'rmwc'
import cx from 'classnames'
import Toolbar from '../widgets/toolbar'
import Layout from './layout.css'
import Style from './commandform.css'

const CommandForm = ({ name, executeCommand, reset, fields }) => (
  <div className={cx('mdc-typography', Layout.page)}>
    <Toolbar title={name} onAccept={executeCommand} onCancel={reset} />
    <Fields fields={fields} />
  </div>
)

const Fields = ({ fields }) => {
  const fieldNames = Object.keys(fields)
  const fieldItems = fieldNames.map((name, index) => {
    const { type, parameters, inputRef } = fields[name]
    const appendParam = (result, param) => `${result}, ${param}`
    const note = parameters
      ? `(state${reduce(appendParam, '', parameters)}) => ${type}`
      : type
    return <FieldItem key={index} name={name} note={note} inputRef={inputRef} />
  })
  return <div className={Style.fields}>{fieldItems}</div>
}

const FieldItem = ({ name, inputRef, note }) => (
  <div className={Style.field}>
    <TextField className={Style.input} label={name} inputRef={inputRef} />
    <TextFieldHelperText theme="secondary">{note}</TextFieldHelperText>
  </div>
)

const applyBehavior = Comp => {
  class Instance extends Component {
    constructor(props) {
      super(props)
      this.state = { fields: null }
      this.executeCommand = this.executeCommand.bind(this)
    }
    static getDerivedStateFromProps({ command }) {
      const fieldNames = Object.keys(command.fields)
      const fields = fieldNames.reduce((result, name) => {
        const field = command.fields[name]
        result[name] = {
          type: field.type,
          parameters: field.parameters,
          inputRef: React.createRef()
        }
        return result
      }, {})
      return { fields }
    }
    render() {
      const { command, reset } = this.props
      const { fields } = this.state
      return (
        <Comp
          name={command.name}
          fields={fields}
          executeCommand={this.executeCommand}
          reset={reset}
        />
      )
    }
    executeCommand() {
      const { command, execute, reset } = this.props
      const { fields } = this.state
      const fieldNames = Object.keys(fields)
      const fieldValues = fieldNames.reduce((result, name) => {
        const fieldValue = fields[name].inputRef.current.value
        if (fieldValue) {
          result[name] = fields[name].inputRef.current.value
        }
        return result
      }, {})
      execute({
        name: command.name,
        fields: fieldValues
      })
      reset()
    }
  }
  const select = state => ({
    execute: state.api.execute
  })
  return connect(select)(Instance)
}

export default applyBehavior(CommandForm)
