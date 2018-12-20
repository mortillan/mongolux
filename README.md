# Mongo Lux
###### A thin wrapper :package: to [MongoDB node.js driver] (https://mongodb.github.io/node-mongodb-native/) using ES6.
###### No schema, no magic, just plain objects{} and array of objects[{}...]

## Installation

`npm install mongolux`

## Bootstrapping your express.js application
```
const mongolux = require('mongolux');
....

await mongolux.bootstrap(require('./path/to/config/database'));
```

## Create your config file (database.js is just a filename)
This is what your database.js file should look like
```
module.exports = {
  database1: {
    uri: 'mongodb://localhost/?retryWrites=true',
    db: 'db1',
    auth: {
      user: 'user1',
      password: 'secret'
    },
    poolSize: 5,
    ssl: true,
    useNewUrlParser: true,
  },
  database2: {
    uri: 'mongodb://example.com/?retryWrites=true',
    db: 'db2',
    auth: {
      user: 'user2',
      password: 'secret'
    },
    poolSize: 5,
    ssl: true,
    useNewUrlParser: true,
  }
}
```

All `options` passed to [MongoClient] (http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html) is supported except for `db` (mongolux uses this internally)

## Querying your MongoDB database
```
const { db } = require('mongolux');

...

const users = await db('myDatabase').collection('users').find({}).toArray();
```

`.collection('users').find({}).toArray();`

Seems familiar? Well, those are just functions from the [MongoDB node.js driver] (https://mongodb.github.io/node-mongodb-native/) API. Everything is exactly that because we just wrapped the [mongodb package] (https://www.npmjs.com/package/mongodb).

## Note
I use this on my site. If you need any help, please file an issue @Github