import { mapObjIndexed } from 'ramda'
import { call, select } from 'redux-saga/effects'
import { parse } from '../utils/command'
import Service from '../services/service'

function* evaluate(userInput) {
  const request = yield call(parse, userInput)
  const { fields, service } = yield select(state => {
    const { target, fields } = state.palette[request.command]
    const { service } = state.services[target]
    return { fields, service }
  })
  const insertFieldType = _insertField.bind(null, fields)
  request.payload = mapObjIndexed(insertFieldType, request.payload)
  const { message } = yield call(Service.executeWith, service, request)
  console.log(message)
}

function _insertField(types, field, fieldName) {
  const type = types[fieldName]
  return { ...field, type }
}

export default { evaluate }
