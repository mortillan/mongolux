# Mongo Lux (beta)
###### A thin wrapper :package: to [MongoDB node.js driver] (https://mongodb.github.io/node-mongodb-native/) using ES6 promises.

## Installation

`npm install mongolux`

Bootstrapping your application
```
const mongolux = require('mongolux');

....

await mongolux.bootstrap();
```

Querying your MongoDB database
```
const { db } = require('mongolux');

...

const users = await db('myDatabase').collection('users').find({}).toArray();
```

`.collection('users').find({}).toArray();`
Seems familiar? Well, because those are functions from the [MongoDB node.js driver] (https://mongodb.github.io/node-mongodb-native/) API. Everything is exactly that because we just added a scaffolding for mongodb package.

## Note
This library is still on beta. If you need any help, please file an issue @Github