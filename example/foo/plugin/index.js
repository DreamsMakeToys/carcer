const protoJson = require('./foo.proto.json')
const palette = require('./palette')
const reducer = require('./reducer')

const protoJson64 = Buffer.from(JSON.stringify(protoJson)).toString('base64')
const reducer64 = Buffer.from(reducer + '').toString('base64')

module.exports = { protoJson64, palette, reducer64 }
