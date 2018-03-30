import { drop, reduce, split, trim, mapObjIndexed } from 'ramda'

function parse(commandString) {
  commandString = trim(commandString)
  const tokens = split(/\s+/, commandString)
  const name = tokens[0]
  const args = drop(1, tokens)
  const payload = reduce(_toPayload, {}, args)
  return { name, payload }
}

function _toPayload(result, arg) {
  const tokens = split(/=/, arg)
  const field = tokens[0]
  const value = tokens[1]
  result[field] = value
  return result
}

function massage(commandPayload, fields) {
  const massageField = _massageField.bind(null, fields)
  return mapObjIndexed(massageField, commandPayload)
}

function _massageField(types, value, name) {
  const type = types[name]
  switch (type) {
    case 'INTEGER':
      return parseInt(value)
    case 'DOUBLE':
      return parseFloat(value)
    default:
      return value
  }
}

export { parse, massage }
