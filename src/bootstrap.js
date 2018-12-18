'use strict'

const connectionFactory = require('./connection')
const config = require.main.require('./config/database')
const connections = new Map()

module.exports.bootstrap = async () => {
  Object.entries(config).forEach(async ([name, { uri, db, ...opts }]) => {
    try {
      const conn = await connectionFactory(uri, opts)
      const database = conn.db(db)
      connections.set(name, database)
    } catch (err) {
      throw err
    }
  })
}

module.exports.getConnection = (connectionName) => {
  if(!connections.has(connectionName)) {
    throw Error(`Connection to ${connectionName} not found. Check your server connectivity.`)
  }
  return connections.get(connectionName)
}
