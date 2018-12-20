module.exports = {
  database1: {
    uri: 'mongodb://127.0.0.1:4000/?retryWrites=true',
    db: 'db1',
    useNewUrlParser: true,
  },
  database2: {
    uri: 'mongodb://127.0.0.1:4001/?retryWrites=true',
    db: 'db2',
    useNewUrlParser: true,
  }
}
