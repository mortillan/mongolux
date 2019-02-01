'use strict'

const connectionFactory = require('./connection')
const bootstrap = require('./bootstrap')

module.exports.connectionFactory = connectionFactory
module.exports.db = bootstrap.getConnection
module.exports.bootstrap = bootstrap.bootstrap
