const express = require('express')
const router = express.Router()
const fetch = require('node-fetch')

const USERS_SERVICE_URL = process.env.USERS_SERVICE_URL || 'https://panteon-leadersboard-user.herokuapp.com'
const MONEY_STREAM_SERVICE_URL = process.env.MONEY_STREAM_SERVICE_URL || 'https://panteon-leadersboard-money-str.herokuapp.com'



router.get('/money-create/:count/:date', async (req, res) => {
  const count = req.params.count
  const date = req.params.date

  createMoney(count, date)
  res.send('OK...')
})


async function createMoney(count, date) {
  const users = await getUsers()
  const usersCount = users.length

  for (let i = 0; i < count; i++) {
    const randomUserIndex = getRandomNumber(0, usersCount)
    const user = users[randomUserIndex]
    const randomDateTime = getRandomDateTime(date)
    const money = {
      username: user.username,
      amount: getRandomNumber(1, 100),
      datetime: randomDateTime
    }

    const res = fetch(`${MONEY_STREAM_SERVICE_URL}/money-stream`, {
      method: 'POST',
      body: JSON.stringify(money),
      headers: {'Content-Type': 'application/json'}
    })

  }
}

async function getUsers() {
  const res = await fetch(`${USERS_SERVICE_URL}/user`)
  const usersData = await res.json()
  return usersData
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

module.exports = router