const faker = require('@faker-js/faker').faker
const fs = require("fs")
const { pipeline } = require("stream")

const USER_COUNT = 1000

const users = []
const ws = fs.createWriteStream("./users.txt")


function createUser() {
  return {
    username: faker.internet.userName(),
    country: faker.address.country(),
    countryCode: faker.address.countryCode()
  }
}

function writeToFile(obj, stream) {
  stream.write(JSON.stringify(obj) + '\n')
}


for (let i = 0; i < USER_COUNT; i++) {
  const fakeUser = createUser()
  writeToFile(fakeUser, ws)
  
}

console.log(users.length)

function saveToFile(obj) {
  
  ws.write(JSON.stringify(obj))
}
