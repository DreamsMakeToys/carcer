const paletteFunc = require('./palette')
const reducer = require('./reducer')
const protoJson = require('./foo.proto.json')

const palette64 = Buffer.from(paletteFunc + '').toString('base64')
const reducer64 = Buffer.from(reducer + '').toString('base64')
const protoJson64 = Buffer.from(JSON.stringify(protoJson)).toString('base64')

module.exports = { palette64, reducer64, protoJson64 }
