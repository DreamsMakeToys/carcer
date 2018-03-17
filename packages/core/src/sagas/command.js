import { mapObjIndexed } from 'ramda'
import { call, put, select } from 'redux-saga/effects'
import { Action } from '../constants'
import { parse } from '../utils/command'
import Service from '../services/service'

function* evaluate(userInput) {
  const request = yield call(parse, userInput)
  const { target, fields, service } = yield select(state => {
    const { target, fields } = state.palette[request.command]
    const { service } = state.services[target]
    return { target, fields, service }
  })
  const insertFieldType = _insertField.bind(null, fields)
  request.payload = mapObjIndexed(insertFieldType, request.payload)
  const { message } = yield call(Service.executeWith, service, request)
  const status = { target, message }
  yield put({
    type: Action.COMMAND_EXECUTED,
    payload: { status }
  })
}

function _insertField(types, field, fieldName) {
  const type = types[fieldName]
  return { ...field, type }
}

export default { evaluate }
