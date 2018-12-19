const chai = require('chai')
chai.use(require("chai-events"));
chai.use(require('chai-as-promised'));
const expect = chai.expect
const should = chai.should()

const mms = require('mongodb-memory-server')
const connectionFactory = require('../src/connection')
const { Db, MongoClient } = require('mongodb')

describe('connectionFactory', function () {
  it('Shoud connect to mongodb using mongolux', async function () {
    const mongod = new mms.MongoMemoryServer()

    const connectionString = await mongod.getConnectionString()
    const dbName = await mongod.getDbName()
    const uri = connectionString.replace(dbName, '')

    const client = await connectionFactory(uri, {
      useNewUrlParser: true,
    })

    expect(client).to.be.instanceOf(MongoClient)
  })

  it('Should fail to connect if mongodb is down', async function () {
    const mongod = new mms.MongoMemoryServer()

    const connectionString = await mongod.getConnectionString()
    const dbName = await mongod.getDbName()
    const uri = connectionString.replace(dbName, '')

    await mongod.stop()
    
    // const client = connectionFactory(uri, {
    //   useNewUrlParser: true,
    // })

    // try {
      // expect(await client).should.emit('error')
    // } catch (error) {
    //   console.log(error instanceof Error)
    // }
    
    // try {
    //   expect(await client).to.be.rejectedWith(Error)
    // } catch (error) {
    //   console.log(error.stack)
    // }
    
  })


})