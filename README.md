# Mongo Lux
###### A thin wrapper :package: to [MongoDB node.js driver] (https://mongodb.github.io/node-mongodb-native/) using ES6.
###### No schema, no magic, just plain objects{} and array of objects[{}...]

## Supported node.js frameworks
* [express.js](https://www.npmjs.com/package/express)
* [connect](https://www.npmjs.com/package/connect)

## Installation

`npm install mongolux`

## Bootstrapping your express.js application
```
const { bootstrap, db } = require('mongolux');
....

await bootstrap(require('./path/to/config/database'));
```

## Create your config file (database.js is just a filename)
This is what your database.js file should look like
```
module.exports = {
  database1: {
    uri: 'mongodb://127.0.0.1:4000/?retryWrites=true',
    db: 'db1',
    useNewUrlParser: true,
    poolSize: 5,
    ssl: false,
    sslValidate: true,
    sslCA: null,
    sslCert: null,
    sslKey: null,
    sslPass: null,
    autoReconnect: true,
    noDelay: true,
    keepAlive: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 360000,
    reconnectTries: 30,
    reconnectInterval: 1000,
    ha: true,
    haInterval: 10000,
    replicaSet: null,
    secondaryAcceptableLatencyMS: 15,
    acceptableLatencyMS: 15,
    connectWithNoPrimary: false,
    authSource: null,
    w: null,
    wtimeout: null,
    j: false,
    forceServerObjectId: false,
    serializeFunctions: false,
    ignoreUndefined: false,
    raw: false,
    promoteLongs: true,
    promoteBuffers: false,
    promoteValues: true,
    domainsEnabled: false,
    bufferMaxEntries: -1,
    readPreference: null,
    pkFactory: null,
    promiseLibrary: null,
    readConcern: null,
    maxStalenessSeconds: null,
    appname: null,
    loggerLevel: null,
    logger: null,
  },
  database2: {
    uri: 'mongodb://127.0.0.1:4001/?retryWrites=true',
    db: 'db2',
    useNewUrlParser: true,
    poolSize: 5,
    ssl: false,
    sslValidate: true,
    sslCA: null,
    sslCert: null,
    sslKey: null,
    sslPass: null,
    autoReconnect: true,
    noDelay: true,
    keepAlive: 30000,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 360000,
    reconnectTries: 30,
    reconnectInterval: 1000,
    ha: true,
    haInterval: 10000,
    replicaSet: null,
    secondaryAcceptableLatencyMS: 15,
    acceptableLatencyMS: 15,
    connectWithNoPrimary: false,
    authSource: null,
    w: null,
    wtimeout: null,
    j: false,
    forceServerObjectId: false,
    serializeFunctions: false,
    ignoreUndefined: false,
    raw: false,
    promoteLongs: true,
    promoteBuffers: false,
    promoteValues: true,
    domainsEnabled: false,
    bufferMaxEntries: -1,
    readPreference: null,
    pkFactory: null,
    promiseLibrary: null,
    readConcern: null,
    maxStalenessSeconds: null,
    appname: null,
    loggerLevel: null,
    logger: null,
  },
}
```

All `options` passed to [MongoClient] (http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html) is supported except for `db` (mongolux uses this internally)

## Querying your MongoDB database
```
const { db } = require('mongolux');

...

const users = await db('database1').collection('users').find({}).toArray();
```

`.collection('users').find({}).toArray();`

Seems familiar? Well, those are just functions from the [MongoDB node.js driver] (https://mongodb.github.io/node-mongodb-native/) API. Everything is exactly that because we just wrapped the [mongodb package] (https://www.npmjs.com/package/mongodb).

## Binding listeners for each database connection
```
db().forEach((client, name) => {
  client.on('close', () => console.log(`Disconnected from mongolux ${name}...`))
  client.on('reconnect', () => console.log(`Reconnected from mongolux ${name}...`))
})
```

## Note
I use this on my site. If you need any help, please file an issue @Github