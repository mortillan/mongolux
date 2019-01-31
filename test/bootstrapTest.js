const chai = require('chai')
chai.use(require("chai-events"))
chai.use(require('chai-as-promised'))
chai.use(require('chai-iterator'))
chai.should();
const expect = chai.expect
const sinon = require('sinon')

const mms = require('mongodb-memory-server')
const { bootstrap, db } = require('../src/index')
const { Db, MongoError } = require('mongodb')

describe('bootstrap', function () {

  let mongod1, mongod2
  const configFile = 'config/database'
  const file = require.main.require(configFile)

  beforeEach(async function () {
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

  after(async function () {
    // try{
    //   await mongod1.stop()
    // await mongod2.stop()
    // } catch(err) {
    //   console.log(err)
    // }
    
  })

  it('Shoud load config file and connect to mongodb', async function () {
    await bootstrap(file)

    expect(db('database1')).to.be.instanceOf(Db)
    expect(db('database2')).to.be.instanceOf(Db)
  })

  it('Should throw error if one failed to connect to mongod server', async function () {
    await mongod1.stop()

    return bootstrap(file).should.be.rejected
  })

  it('Should be able to add listener per connection', async function () {
    await bootstrap(file)

    const callback = sinon.spy()
    db('database1').on('close', callback)

    await mongod1.stop()

    expect(callback.called).to.be.true
  })

})
