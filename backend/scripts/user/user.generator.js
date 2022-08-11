const faker = require('@faker-js/faker').faker
const mongoose = require("mongoose")
const userModel = require("./user.model.js")
const fs = require("fs")
const { pipeline } = require("stream")
const readline = require('readline')
const { countries } = require('country-data')

const User = mongoose.model('user', userModel)
const USER_COUNT = 998

const MONGO_URL = 'mongodb+srv://gaslandev:190225384@panteon-leadersboard.rbx7i04.mongodb.net/?retryWrites=true&w=majority'
// const MONGO_URL = 'mongodb://localhost:27017/users'

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection established with Book");
  })
  .catch(() => {
    console.log("Connection failed");
  })



function createUser() {
  const countryCode = faker.address.countryCode()
  return {
    username: faker.internet.userName(),
    country: countries[countryCode].name,
    countryCode: countryCode
  }
}


for (let i = 0; i < USER_COUNT; i++) {
  const fakeUser = createUser()
  // console.log(fakeUser)
  // saveToFile(fakeUser)
  saveToMongo(fakeUser)
}

// (async () => {
//   const rs = fs.createReadStream("users.txt")

//   const rl = readline.createInterface({
//     input: rs,
//     crlfDelay: Infinity
//   })
  
//   for await (const line of rl) {
//     console.log('SATIR BU:  ', `Line from file: ${line}`)
//     const user = JSON.parse(line)
//     saveToMongo(user)
//   }
// })()











function saveToFile(obj) {
  const rs = fs.createReadStream("./myfile")
  const ws = fs.createWriteStream("./checksum.txt")

  pipeline(rs, ws, (err) => {
    err && console.error(err);
  })
}

function saveToMongo(obj) {
  const user = new User(obj)
  user.save()
    .then((data) => {
      // console.log(data)
    })
    .catch((err) => {
      console.log(err)
    })
}