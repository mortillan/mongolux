const chai = require('chai')
chai.use(require("chai-events"))
chai.use(require('chai-as-promised'))
chai.use(require('chai-iterator'))
const expect = chai.expect
const sinon = require('sinon')

const mms = require('mongodb-memory-server')
const { bootstrap, db } = require('../src/index')
const { MongoClient } = require('mongodb')

let mongod1, mongod2

describe('bootstrap', function () {
  
  const configFile = 'config/database'
  const file = require.main.require(configFile)

  beforeEach(async function() {
    mongod1 = new mms.MongoMemoryServer({
      instance: {
        dbName: file.database1.db,
      }
    })

    file.database1.uri = await mongod1.getConnectionString()

    mongod2 = new mms.MongoMemoryServer({
      instance: {
        dbName: file.database2.db,
      }
    })

    file.database2.uri = await mongod2.getConnectionString()
  })

  it('Shoud load config file and connect to mongodb', async function () {
    await bootstrap(file)

    expect(db('database1')).to.be.instanceOf(MongoClient)
    expect(db('database2')).to.be.instanceOf(MongoClient)
  })

  it('Should throw error if one failed to connect to mongod server', async function () {
    await mongod1.stop()
    expect(bootstrap(file)).to.be.rejected
  })

  it('Should be able to add listener per connection', async function() {
    await bootstrap(file)

    const connections = db()

    const callback = sinon.spy()
    connections.forEach((conn, name) => conn.on('close', callback))
    
    await Promise.all([mongod1.stop(), mongod2.stop()])

    expect(callback.calledTwice).to.be.equal(true)
  })

})
