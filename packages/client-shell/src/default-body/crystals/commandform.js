import React, { Component } from 'react'
import { connect } from 'react-redux'
import { TextField, TextFieldHelperText, Button } from 'rmwc'
import cx from 'classnames'
import Toolbar from '../widgets/toolbar'
import Layout from './layout.css'
import Style from './commandform.css'

const CommandForm = ({ name, execute, reset, fields }) => (
  <div className={cx('mdc-typography', Layout.page)}>
    <Toolbar title={name} onAccept={execute} onCancel={reset} />
    <Fields fields={fields} />
  </div>
)

const Fields = ({ fields }) => {
  const fieldNames = Object.keys(fields)
  const fieldItems = fieldNames.map((name, index) => {
    const { type, inputRef } = fields[name]
    return <FieldItem key={index} name={name} type={type} inputRef={inputRef} />
  })
  return <div className={Style.fields}>{fieldItems}</div>
}

const FieldItem = ({ name, inputRef, type }) => (
  <div className={Style.field}>
    <TextField className={Style.input} label={name} inputRef={inputRef} />
    <TextFieldHelperText theme="secondary">{type}</TextFieldHelperText>
  </div>
)

const applyBehavior = Comp => {
  class Instance extends Component {
    constructor(props) {
      super(props)
      this.state = { fields: null }
      this.execute = this.execute.bind(this)
    }
    static getDerivedStateFromProps({ command }) {
      const fieldNames = Object.keys(command.fields)
      const fields = fieldNames.reduce((result, name) => {
        result[name] = {
          type: command.fields[name],
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
          execute={this.execute}
          reset={reset}
        />
      )
    }
    execute() {
      const { command, execute, reset } = this.props
      const { fields } = this.state
      const fieldNames = Object.keys(fields)
      const fieldValues = fieldNames.reduce((result, name) => {
        result[name] = fields[name].inputRef.current.value
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
