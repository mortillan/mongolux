'use strict'

const connectionFactory = require('./connection')

const connections = new Map()

/**
 * 
 * Connects to the provided mongodb servers and create an array of connections
 * retrievable using provided key in configuration file.
 */
module.exports.bootstrap = async (config = {}) => {
  const configArray = Object.entries(config)

  const connPending = configArray.map(async ([name, { uri, db, ...opts }]) => {
    return connectionFactory(uri, opts)
  })

  try {
    const connResolved = await Promise.all(connPending)

    configArray.forEach(([name], index) => {
      connections.set(name, connResolved[index].db(name))
    })
  } catch (err) {
    throw err
  }
}

/**
 * 
 * Retrieve a connection to the mongodb server by providing key set in configuration file.
 * If no key is provided, returns an array of stored connection.
 */
module.exports.getConnection = (connectionName) => {
  if(!connectionName) {
    return connections
  }

  if (!connections.has(connectionName)) {
    throw Error(`Connection to ${connectionName} not found. Check your server connectivity.`)
  }

  return connections.get(connectionName)
}
