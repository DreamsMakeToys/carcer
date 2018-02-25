import { combineReducers } from 'redux'

import api from './api'
import crystal from './crystal'
import renderer from './renderer'

export default combineReducers({ api, crystal, renderer })
