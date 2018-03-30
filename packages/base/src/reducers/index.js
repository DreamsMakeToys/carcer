import { combineReducers } from 'redux'
import api from './api'
import palette from './palette'
import plugins from './plugins'
import session from './session'

export default combineReducers({ api, palette, plugins, session })
