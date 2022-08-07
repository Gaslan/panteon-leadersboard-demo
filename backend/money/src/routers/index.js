const express = require('express')
const router = express.Router()
const {createClient} = require('redis')
const saveMoney = require('../service/money.post')

require('../service/money.kafka.consumer')


router.get('/', (req, res) => {
  res.send("This is money service!")
})

router.post('/money', async (req, res) => {
  const moneyObj = req.body
  try {
    await saveMoney(moneyObj)
    res.sendStatus(200)
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
  }
})

router.get('/money', async (req, res) => {
  try {
    const redisClient = createClient({
      url: 'redis://redis'
    })
    await redisClient.connect()
    const sonuc = await redisClient.zRange('ingamemoney', 0, -1)
    await redisClient.quit()
    res.send(sonuc)
  } catch (e) {
    res.sendStatus(500)
  }
})

module.exports = router