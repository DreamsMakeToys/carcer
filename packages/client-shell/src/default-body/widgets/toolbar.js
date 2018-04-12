import React from 'react'
import {
  Toolbar as RMToolbar,
  ToolbarRow,
  ToolbarSection,
  ToolbarIcon,
  ToolbarTitle
} from 'rmwc'
import Style from './toolbar.css'

const Toolbar = ({ title, onCancel, onAccept }) => {
  let cancelButton = null
  let titleStyle = null
  if (onCancel) {
    cancelButton = <ToolbarIcon use="arrow_back" onClick={onCancel} />
    titleStyle = { marginLeft: 12 }
  }
  let acceptButton = null
  if (onAccept) {
    acceptButton = <ToolbarIcon use="send" onClick={onAccept} />
  }
  return (
    <RMToolbar className={Style.toolbar}>
      <ToolbarRow>
        <ToolbarSection alignStart>
          {cancelButton}
          <ToolbarTitle style={titleStyle}>{title}</ToolbarTitle>
        </ToolbarSection>
        <ToolbarSection alignEnd>{acceptButton}</ToolbarSection>
      </ToolbarRow>
    </RMToolbar>
  )
}

export default Toolbar
