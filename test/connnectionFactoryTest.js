const chai = require('chai')
chai.use(require("chai-events"));
chai.use(require('chai-as-promised'));
const expect = chai.expect

const mms = require('mongodb-memory-server')
const connectionFactory = require('../src/connection')
const { Db, MongoClient } = require('mongodb')

describe('connectionFactory', function () {

  it('Shoud throw error when connection string is invalid', async function () {
    const configFile = 'config/database'
    const file = require.main.require(configFile)

    const mongod1 = new mms.MongoMemoryServer({
      instance: {
        dbName: file.database1.db,
      }
    })

    file.database1.uri = 'mongodb://127.0.0.1:53810/db1' //invalid uri

    const { uri, db, ...opts } = file.database1

    await expect(connectionFactory(uri, opts)).to.be.rejected
  })

  it('Shoud throw error when connecting while mongodb server is down', async function () {
    const configFile = 'config/database'
    const file = require.main.require(configFile)

    const { uri, db, ...opts } = file.database2

    await expect(connectionFactory(uri, opts)).to.be.rejected
  })

})
