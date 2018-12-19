const fs = require('fs')
const path = require('path')
const readline = require('readline')

const rootDir = path.dirname(require.main.filename)
const pathFile = path.join(rootDir, '../config')
const fileName = 'database.js'
const exists = fs.existsSync(path.join(pathFile, fileName))

const io = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

io.question(`Where do you want to place the config directory? ['./config'] `, (answer) => {
  if(!answer) {
    answer = './config'
  }

  console.log(path.join(rootDir, answer))
  process.exit()

  if (exists) {
    console.warn(`Config file already existing in project.`)
    process.exit()
  }

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

  fs.mkdirSync(pathFile, { recursive: true })

  fs.writeFileSync(path.join(pathFile, fileName), template, { flag: 'w' }, (err) => {
    if (err) {
      return console.error(`Mongolux was not able to create a file ./config/database. Try manually creating the file. Visit documentation for details.`)
    }
  })
})