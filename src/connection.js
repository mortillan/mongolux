'use strict'

const MongoClient = require('mongodb').MongoClient

module.exports = async function (uri, opts = {}) {
  const client = new MongoClient(uri, opts)
  return client.connect();
}