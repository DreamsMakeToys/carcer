import { h, Text, Component } from 'ink'
import { setInterval } from 'timers'

const CURSOR = '⏣'

const TextInput = ({ value }) => {
  return (
    <span>
      <Text dim>{value}</Text>
      <Text>{CURSOR}</Text>
    </span>
  )
}

const applyBehavior = Comp => {
  class Instance extends Component {
    constructor(props) {
      super(props)
      this.handleKeyPress = this.handleKeyPress.bind(this)
    }
    componentDidMount() {
      process.stdin.on('keypress', this.handleKeyPress)
    }
    componentWillUnmount() {
      process.stdin.removeListener('keypress', this.handleKeyPress)
    }
    render({ value }) {
      return <Comp value={value} />
    }
    // Reference: https://github.com/vadimdemedes/ink-text-input/blob/master/src/index.js
    handleKeyPress(char, key) {
      const { value, handleInput, handleSubmit } = this.props
      if (key.name === 'return') {
        handleSubmit(value)
        return
      }
      if (key.name === 'backspace') {
        handleInput(value.slice(0, -1))
        return
      }
      if (
        key.name === 'space' ||
        (key.sequence === char && /^.*$/.test(char) && !key.ctrl)
      ) {
        handleInput(value + char)
      }
    }
  }
  return Instance
}

export default applyBehavior(TextInput)
