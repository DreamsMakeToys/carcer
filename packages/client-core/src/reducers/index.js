import { combineReducers } from 'redux'
import api from './api'
import base from './base'
import palette from './palette'

export default combineReducers({ api, base, palette })
