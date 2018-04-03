import { h, Text, Component } from 'ink'

const CURSOR = '⏣'

const TextInput = ({ value, width }) => {
  const massagedValue = massage(width, value)
  return (
    <span>
      <Text dim>{massagedValue}</Text>
    </span>
  )
}

const massage = (width, value) => {
  const valueLength = value.length
  return valueLength >= width
    ? '...' + value.slice(valueLength - width + 4) + CURSOR
    : value + CURSOR + ' '.repeat(width - valueLength - 1)
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
    render({ width, value }) {
      return <Comp width={width} value={value} />
    }
    handleKeyPress(char, key) {
      const { value, handleInput, handleSubmit } = this.props
      switch (key.name) {
        case 'return':
          handleSubmit(value)
          return
        case 'backspace':
          const lastValue = value.slice(0, -1)
          handleInput(lastValue)
          return
        case 'space':
        default:
          const newValue = value + char
          handleInput(newValue)
          return
      }
    }
  }
  return Instance
}

export default applyBehavior(TextInput)
