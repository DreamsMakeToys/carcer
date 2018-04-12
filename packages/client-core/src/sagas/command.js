import { select } from 'redux-saga/effects'
import Base from '../services/base'

function* execute(command) {
  const socket = yield select(state => state.base.socket)
  yield Base.execute(socket, command)
}

export default { execute }
