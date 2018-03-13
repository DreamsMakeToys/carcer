import { mapObjIndexed } from 'ramda'
import { call, select } from 'redux-saga/effects'
import { parse } from '../utils/command'

function* evaluate(userInput) {
  const command = yield call(parse, userInput)
  const { fields, socket } = yield select(state => {
    const { target, fields } = state.palette[command.name]
    const { socket } = state.services[target]
    return { fields, socket }
  })
  const insertFieldType = _insertField.bind(null, fields)
  command.payload = mapObjIndexed(insertFieldType, command.payload)
  socket.write({ command })
}

function _insertField(types, field, fieldName) {
  const type = types[fieldName]
  return { ...field, type }
}

export default { evaluate }
