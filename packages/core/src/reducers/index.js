import { combineReducers } from 'redux'
import api from './api'
import palette from './palette'
import services from './services'
import session from './session'

export default combineReducers({ api, palette, services, session })
