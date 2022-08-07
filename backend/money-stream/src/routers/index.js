const express = require('express')
const router = express.Router()
const fs = require('fs')
const readline = require('readline')
const { Kafka } = require('kafkajs')

const TOPIC = 'money6-topic'
const BROKER_URL = process.env.BROKER_URL || 'localhost';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [`${BROKER_URL}:9092`]
})

const producer = kafka.producer()

async function kafkaTopicProduce(message) {
  await producer.send({
    topic: TOPIC,
    messages: [
      { value: message },
    ],
  })
}

router.get('/', (req, res) => {
  res.send("This is money-stream service!")
})

router.post('/money-stream', async (req, res) => {
  await producer.connect()
  const rs = fs.createReadStream("money.txt")
  const rl = readline.createInterface({
    input: rs,
    crlfDelay: Infinity
  })

  for await (const line of rl) {
    kafkaTopicProduce(line).catch(console.error)
  }

  res.send("oldu")
})

module.exports = router