import { mapObjIndexed } from 'ramda'

function massage(fields, config) {
  const massageField = _massageField.bind(null, config)
  return mapObjIndexed(massageField, fields)
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

export { massage }
