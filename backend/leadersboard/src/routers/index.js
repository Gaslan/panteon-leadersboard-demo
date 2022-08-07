const express = require('express')
const router = express.Router()
const {createClient} = require('redis')
const fetch = require('node-fetch')

router.get('/', (req, res) => {
  res.send("This is money service!")
})

router.get('/leadersboard/daily/:date', async (req, res) => {
  try {
    const redisClient = createClient({
      url: 'redis://redis'
    })
    await redisClient.connect()
    let currentDateData = await redisClient.zRangeWithScores(`igm:daily:${req.params.date}`, 0, 99, {REV: true})
    const userNames = currentDateData.map(x => x.value).map(x => x.replaceAll('\"', ''))
    const userData = await getUsersData(userNames)
    const userList = []

    for (let i = 0; i < currentDateData.length; i++) {
      const currentData = currentDateData[i];
      const u = userData.filter(x => currentData.value.replaceAll('\"', '') == x.username)[0]
      const user = {}
      user.username = u.username
      user.country = u.country
      user.countryCode = u.countryCode
      user.score = currentData.score
      user.rank = i + 1
      user.dailyDiff = 0

      const previousDayKey = `igm:daily:${getPreviousDay(req.params.date)}`
      let previousDateRank = await redisClient.zRevRank(previousDayKey, `"${user.username}"`)
      
      if (previousDateRank) {
        user.dailyDiff = previousDateRank + 1 - user.rank
      }      

      userList.push(user)
    }

    await redisClient.quit()
    res.send(userList)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

router.get('/leadersboard/weekly/:date', async (req, res) => {
  try {
    const redisClient = createClient({
      url: 'redis://redis'
    })
    await redisClient.connect()

    let currentDateData = await redisClient.zRangeWithScores(`igm:weekly:${req.params.date}`, 0, 99, {REV: true})
    const userNames = currentDateData.map(x => x.value).map(x => x.replaceAll('\"', ''))
    const userData = await getUsersData(userNames)
    const userList = []

    for (let i = 0; i < currentDateData.length; i++) {
      const currentData = currentDateData[i];
      const u = userData.filter(x => currentData.value.replaceAll('\"', '') == x.username)[0]
      const user = {}
      user.username = u.username
      user.country = u.country
      user.countryCode = u.countryCode
      user.score = currentData.score
      user.rank = i + 1
      user.dailyDiff = 0    

      userList.push(user)
    }

    await redisClient.quit()
    res.send(userList)
  } catch (e) {
    console.log(e)
    res.sendStatus(500)
  }
})

async function getUsersData(userNames) {
  const res = await fetch('http://192.168.0.21:3000/users', {
    method: 'POST',
    body: JSON.stringify(userNames),
    headers: {'Content-Type': 'application/json'}
  })

  return await res.json()
}

function getPreviousDay(date) {
  let dateObj = new Date(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`)
  dateObj.setDate(dateObj.getDate() - 1)
  return dateObj.toISOString().slice(0, 10).replaceAll('-', '')
}

module.exports = router