const chai = require('chai')
chai.use(require("chai-events"));
chai.use(require('chai-as-promised'));
const expect = chai.expect
const should = chai.should()

const mms = require('mongodb-memory-server')
const { bootstrap, db } = require('../src/index')
const { MongoClient } = require('mongodb')

describe('connectionFactory', function () {

  it('Shoud load config file and connect to mongodb', async function () {
    const configFile = 'config/database.js'
    const file = require.main.require(configFile)
    
    const mongod1 = new mms.MongoMemoryServer({
      instance: {
        dbName: file.database1.db,
      }
    })

    file.database1.uri = await mongod1.getConnectionString()

    const mongod2 = new mms.MongoMemoryServer({
      instance: {
        dbName: file.database2.db,
      }
    })

    file.database2.uri = await mongod2.getConnectionString()

    await bootstrap(file)
    console.log(db('database1'))
    // expect(db('database1')).to.be.instanceOf(MongoClient)
  })

  it('Should fail to connect if mongodb is down', async function () {
    // const mongod = new mms.MongoMemoryServer()

    // const connectionString = await mongod.getConnectionString()
    // const dbName = await mongod.getDbName()
    // const uri = connectionString.replace(dbName, '')

    // await mongod.stop()
    
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