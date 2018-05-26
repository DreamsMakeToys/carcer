import { partial, mapObjIndexed, concat, addIndex, reduce } from 'ramda'

function massage(fieldsConfig, rootState, fields) {
  const massageField = partial(_massageField, [fieldsConfig, rootState])
  return mapObjIndexed(massageField, fields)
}

function _massageField(fieldsConfig, rootState, value, name) {
  const config = fieldsConfig[name]
  const expression = _parseExpression(value)
  if (expression) {
    const fieldParameters = config.parameters || []
    const evaluate = _createEvaluator(rootState, fieldParameters, expression)
    return config.parameters ? evaluate : evaluate()
  }
  switch (config.type) {
    case 'STRING':
      return value
    case 'INTEGER':
      return parseInt(value)
    case 'DOUBLE':
      return parseFloat(value)
    case '[STRING]':
    case '[INTEGER]':
    case '[DOUBLE]':
      return _parseList(value)
    default:
      throw Error(`"${config.type}" is not a recognized field type`)
  }
}

// RAMDAIFY
function _parseExpression(value) {
  const matches = value.match(/\?.+/)
  if (!matches) return null
  const match = matches[0]
  return match.slice(1)
}

function _createEvaluator(rootState, fieldParameters, expression) {
  const parameters = concat(['state'], fieldParameters)
  const reduceWithIndex = addIndex(reduce)
  const paramToShort = (result, arg, index) => `${result}$${index}=${arg};`
  const shorthandAccess = reduceWithIndex(paramToShort, '', parameters)
  const script = `${shorthandAccess}return ${expression}`
  const definition = concat(parameters, [script])
  const Evaluator = partial(Function, definition) // TODO UNDERSTAND THE SECURITY IMPLICATIONS - injection, monkeypatching, etc.
  const evaluate = new Evaluator()
  return partial(evaluate, [rootState])
}

function _parseList(value) {
  return new Function(`return ${value}`)() // REMOVE HACK
}

export { massage }
