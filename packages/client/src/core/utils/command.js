import { drop, reduce, split, trim } from 'ramda'

//
function parse(command) {
  command = trim(command)
  const tokens = split(/\s+/, command)
  const type = tokens[0]
  const args = drop(1, tokens)
  const payload = reduce(_toPayload, {}, args)

  return { type, payload }
}

function _toPayload(result, arg) {
  const tokens = split(/=/, arg)
  const name = tokens[0]
  const value = tokens[1]

  result[name] = value
  return result
}

export { parse }
