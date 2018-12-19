const fs = require('fs')
const path = require('path')

const template = `module.exports = {
  database1: {
    uri: 'mongodb://localhost/?retryWrites=true',
    db: 'my_database_1',
    auth: {
      user: 'user1',
      password: 'secret'
    },
    poolSize: 5,
    ssl: true,
    useNewUrlParser: true,
  },
  database2: {
    uri: 'mongodb://localhost/?retryWrites=true',
    db: 'my_database_2',
    auth: {
      user: 'user2',
      password: 'secret'
    },
    poolSize: 5,
    ssl: true,
    useNewUrlParser: true,
  }
}
`

const rootDir = path.dirname(require.main.filename)
const pathFile = path.join(rootDir, '../config')

fs.mkdirSync(pathFile, { recursive: true })

fs.writeFileSync(path.join(pathFile, 'database.js'), template, { flag: 'w' }, (err) => {
  if(err) {
    return console.error(`Mongolux was not able to create a file ./config/database. Try manually creating the file. Visit documentation for details.`)
  }
})