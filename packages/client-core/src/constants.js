const Action = {
  ALERT: 'ALERT',
  CLEAR_ALERT: 'CLEAR_ALERT',
  LOAD_PALETTE: 'LOAD_PALETTE',
  SYSTEM_LOADED: 'SYSTEM_LOADED',
  SYSTEM_LOADING: 'SYSTEM_LOADING'
}

const BaseMessage = {
  ALERT: 'ALERT',
  DISCONNECTED: 'DISCONNECTED',
  LOAD_PALETTE: 'LOAD_PALETTE'
}

const ClientMessage = {
  COMMAND: 'COMMAND'
}

export { Action, BaseMessage, ClientMessage }
