import { drop, reduce, split, trim } from 'ramda'

function parse(commandString) {
  commandString = trim(commandString)
  const tokens = split(/\s+/, commandString)
  const command = tokens[0]
  const args = drop(1, tokens)
  const payload = reduce(_toPayload, {}, args)
  return { command, payload }
}

function _toPayload(result, arg) {
  const tokens = split(/=/, arg)
  const field = tokens[0]
  const value = tokens[1]
  result[field] = { value }
  return result
}

export { parse }
