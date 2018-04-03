import { h, Text, Component } from 'ink'
import { connect } from 'ink-redux'
import WindowSize from 'window-size'
import Prompt from './prompt'
import TextInput from './textinput'

const Shell = ({ inputWidth, prompt, value, handleInput, handleSubmit }) => (
  <div>
    <Text>
      {'╭──────────────────╮ '}
      <Prompt
        width={inputWidth - 2}
        title={prompt.title}
        message={prompt.message}
      />
    </Text>
    <div />
    <Text>
      {'│││││ 〉 ⏣  〈 │││││'}
      {'╭' + '─'.repeat(inputWidth) + '╮'}
    </Text>
    <div />
    <Text>
      {'││╭∩╮（︶︿︶）╭∩╮││'}
      {'│ '}
      <TextInput
        width={inputWidth - 2}
        value={value}
        handleInput={handleInput}
        handleSubmit={handleSubmit}
      />
      {' │'}
    </Text>
    <div />
    <Text>
      {'╰──────────────────╯'}
      {'╰' + '─'.repeat(inputWidth) + '╯'}
    </Text>
  </div>
)

const applyBehavior = Comp => {
  const select = state => ({
    evaluateCommand: state.api.evaluate,
    prompt: {
      title: state.session.name,
      message: state.session.description
    }
  })
  class Instance extends Component {
    constructor(props) {
      super(props)
      const { width, height } = WindowSize.get()
      this.state = {
        size: { width, height },
        value: ''
      }
      this.setSize = this.setSize.bind(this)
      this.handleInput = this.handleInput.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount() {
      process.stdout.on('resize', this.setSize)
    }
    render({ prompt }, { size, value }) {
      const inputWidth = size.width - 21 - 1
      return (
        <Comp
          inputWidth={inputWidth}
          prompt={prompt}
          value={value}
          handleInput={this.handleInput}
          handleSubmit={this.handleSubmit}
        />
      )
    }
    setSize() {
      const { width, height } = WindowSize.get()
      const size = { width, height }
      console.clear()
      this.setState({ size })
    }
    handleInput(value) {
      this.setState({ value })
    }
    handleSubmit(value) {
      const { evaluateCommand } = this.props
      evaluateCommand(value).then(() => {
        this.setState({ value: '' })
      })
    }
  }
  return connect(select)(Instance)
}

export default applyBehavior(Shell)
