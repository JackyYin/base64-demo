const fs = require('fs')
const mongoClient = require('./mongo')('test')

const read = (path) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

const calc = (name, buf) => {
  const str = buf.toString('base64')
  const base64Bytes = Buffer.byteLength(str, 'utf8')
  console.log('-----------print buffer information below----------------')
  console.log('image name: ', name)
  console.log('Buffer legnth: ', buf.length)
  console.log('Base64 String length: ', str.length)
  console.log('Base64 String Bytes: ', str.length *  1)
  console.log('Base64 byte length: ', base64Bytes)
  console.log('inflation rate: ', base64Bytes / buf.length)
  console.log('---------------------------------------------------------')
  return Promise.resolve()
}

const input = (document, path) => {
  const start = Date.now()

  return read(path).then(buf => {
    return Promise.all([
      Promise.resolve(buf.toString('base64')),
      calc(path, buf)
    ])
  }).then(data => {
    const [base64Str] = data

    const obj = {
      name: path,
      file: base64Str
    }
    return mongoClient.connect().then(conn => {
      return mongoClient.insert(document, [obj], conn)
    })
  }).then(resp => {
    console.log('total time estimated: ', path, Date.now() - start)
    return Promise.resolve()
  })
}

const query = (name) => {
  const time = Date.now()
  return mongoClient.find('image', {name}).then(_ => {
    console.log('query time estimated: ', name, Date.now() - time)
  })
}

const test1 = () => {
  let promises = [
    input('image', 'image5.jpg'),
    input('image', 'image1.jpg'),
    input('image', 'image2.jpg'),
  ]

  return Promise.all(promises)
}

const test2 = () => {
  let promises = [
    query('image5.jpg'),
    query('image1.jpg'),
    query('image2.jpg'),
  ]

  return Promise.all(promises)
}

eval(`test${process.argv[2] || 1}()`)
