import { combineReducers } from 'redux'
import api from './api'
import client from './client'
import palette from './palette'
import plugins from './plugins'

export default combineReducers({
  api,
  client,
  palette,
  plugins
})
