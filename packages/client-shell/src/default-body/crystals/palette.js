import React from 'react'
import {
  List,
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemSecondaryText,
  ListItemMeta,
  ListDivider
} from 'rmwc'
import cx from 'classnames'
import Toolbar from '../widgets/toolbar'
import Layout from './layout.css'
import Style from './palette.css'

const Palette = ({ palette, beginExecution }) => (
  <div className={cx('mdc-typography', Layout.page)}>
    <Toolbar title="Carcer" />
    <CommandList palette={palette} beginExecution={beginExecution} />
  </div>
)

const CommandList = ({ palette, beginExecution }) => {
  const commandNames = Object.keys(palette)
  const commandItems = commandNames.map((name, index) => (
    <CommandItem
      key={index}
      beginExecution={beginExecution}
      command={palette[name]}
    />
  ))
  return (
    <div>
      <List>{commandItems}</List>
    </div>
  )
}

const CommandItem = ({ beginExecution, command }) => {
  const beginCommandExecution = beginExecution.bind(null, command)
  const itemIcon = command.fields ? 'create' : 'send'
  return (
    <div onClick={beginCommandExecution}>
      <ListItem className={Style.commandItem}>
        <ListItemGraphic theme="secondary">{itemIcon}</ListItemGraphic>
        <ListItemText theme="primary">
          {command.name}
          <ListItemSecondaryText theme="secondary">
            {command.target}
          </ListItemSecondaryText>
        </ListItemText>
        <ListItemMeta theme="secondary">play_circle_outline</ListItemMeta>
      </ListItem>
      <ListDivider />
    </div>
  )
}

export default Palette
