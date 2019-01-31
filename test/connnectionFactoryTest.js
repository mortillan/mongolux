const chai = require('chai')
chai.use(require("chai-events"))
chai.use(require('chai-as-promised'))
chai.should()
const expect = chai.expect

const mms = require('mongodb-memory-server')
const connectionFactory = require('../src/connection')
const { Db } = require('mongodb')

describe('connectionFactory', function () {

  let mongod1
  const configFile = 'config/database'
  const file = require.main.require(configFile)

  beforeEach(function () {
    mongod1 = new mms.MongoMemoryServer({
      instance: {
        dbName: file.database1.db,
      }
    })
  })

  it('Shoud throw error when connection string is invalid', async function () {
    file.database1.uri = 'mongodb://127.0.0.1:0000/db1' //invalid uri

    const { uri, db, ...opts } = file.database1

    return connectionFactory(uri, opts).should.be.rejected
  })

  it('Shoud throw error when connecting while mongodb server is down', async function () {
    const { uri, db, ...opts } = file.database2

    return connectionFactory(uri, opts).should.be.rejected
  })

})
