const fs = require("fs")
const fetch = require('node-fetch')

const MONEY_DATA_COUNT = 10000
const DATE_FOR_MONEY = '2022-08-01'

createMoney()

async function createMoney() {
  const users = await getUsers()
  const usersCount = users.length
  const ws = fs.createWriteStream("./money.txt")

  for (let i = 0; i < MONEY_DATA_COUNT; i++) {
    const randomUserIndex = getRandomNumber(0, usersCount)
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

async function getUsers() {
  const res = await fetch('http://192.168.0.21:3000/users', {
    method: 'POST',
    body: JSON.stringify(userNames),
    headers: {'Content-Type': 'application/json'}
  })

  const usersData = await res.json()
  return usersData
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
