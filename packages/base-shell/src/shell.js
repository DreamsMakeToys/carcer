import { map, toPairs } from 'ramda'
import { h, Text, Component } from 'ink'
import { connect } from 'ink-redux'

const Shell = ({ plugins }) => {
  const pluginItems = map(_appendPluginItem, plugins)
  return <div>{pluginItems}</div>
}

const _appendPluginItem = plugin => {
  const name = plugin[0]
  const state = JSON.stringify(plugin[1], null, 2)
  return <PluginItem name={name} state={state} />
}

const PluginItem = ({ name, state }) => {
  return (
    <div>
      <Text bold>{name}: </Text>
      <Text>{state}</Text>
    </div>
  )
}

const applyBehavior = Comp => {
  class Instance extends Component {
    render({ plugins }, {}) {
      return <Comp plugins={plugins} />
    }
  }
  const select = state => {
    const trimmedPlugins = map(plugin => {
      return plugin.state
    }, state.plugins)
    const plugins = toPairs(trimmedPlugins)
    return { plugins }
  }
  return connect(select)(Instance)
}

export default applyBehavior(Shell)
