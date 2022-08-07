const fs = require("fs")

const MONEY_DATA_COUNT = 10000
const USER_COUNT = 1000
const DATE_FOR_MONEY = '2022-08-01'

createMoney()

function createMoney() {
  const users = getUsers()
  const ws = fs.createWriteStream("./money.txt")

  for (let i = 0; i < MONEY_DATA_COUNT; i++) {
    const randomUserIndex = getRandomNumber(0, USER_COUNT)
    const user = users[randomUserIndex]
    const randomDateTime = getRandomDateTime(DATE_FOR_MONEY)
    const money = {
      username: user.username,
      amount: getRandomNumber(1, 100),
      datetime: randomDateTime
    }
    writeToFile(money, ws)
  }
}

function getUsers() {
  const data = fs.readFileSync('../user/users.txt', 'utf-8')

  return data
    .split('\n')
    .filter(line => line.length > 0)
    .map(line => JSON.parse(line))
}

function writeToFile(obj, stream) {
  stream.write(JSON.stringify(obj) + '\n')
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

function getRandomTime() {
  const second = getRandomNumber(0, 60).toString().padStart(2, '0')
  const minute = getRandomNumber(0, 60).toString().padStart(2, '0')
  const hour = getRandomNumber(0, 24).toString().padStart(2, '0')
  const msec = getRandomNumber(0, 1000).toString().padStart(3, '0')
  return `${hour}:${minute}:${second}.${msec}Z`
}

function getRandomDateTime(date) {
  const time = getRandomTime()
  return `${date}T${time}`
}
