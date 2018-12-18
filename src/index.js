'use strict'

const connectionFactory = require('./connection')
const bootstrap = require('./bootstrap')

module.exports = {
  connectionFactory: connectionFactory,
  db: bootstrap.getConnection,
  bootstrap: bootstrap.bootstrap,
}
