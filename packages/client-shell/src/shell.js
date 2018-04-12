import React, { Component } from 'react'
import { connect } from 'react-redux'

const Shell = ({ body }) => <div>{body}</div>

const applyBehavior = Comp => {
  class Instance extends Component {
    constructor(props) {
      super(props)
      this.state = {
        body: null
      }
      this.loadBody = this.loadBody.bind(this)
    }
    componentDidMount() {
      const bodyBundle = document.createElement('script')
      bodyBundle.src = '/body.js'
      bodyBundle.async = true
      bodyBundle.onload = this.loadBody
      document.body.appendChild(bodyBundle)
    }
    render() {
      const { body } = this.state
      return <Comp body={body} />
    }
    loadBody() {
      const body = window.ClientBody.load()
      delete window.ClientBody
      this.setState({ body })
    }
  }
  return Instance
}

export default applyBehavior(Shell)
