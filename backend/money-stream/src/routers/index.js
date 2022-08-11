const express = require('express')
const router = express.Router()
const fs = require('fs')
const readline = require('readline')
const { Kafka, Partitioners  } = require('kafkajs')

const KAFKA_TOPIC = process.env.KAFKA_TOPIC || 'money6-topic'
const BROKERS = process.env.BROKERS || 'localhost:9092'
const KAFKA_GROUP_ID = process.env.KAFKA_GROUP_ID || 'money-group'
const KAFKA_USERNAME = process.env.KAFKA_USERNAME || 'username'
const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD || 'password'

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: BROKERS.split(','),
  ssl: true,
  sasl: {
    mechanism: 'scram-sha-256', // scram-sha-256 or scram-sha-512
    username: KAFKA_USERNAME,
    password: KAFKA_PASSWORD
  },
  connectionTimeout: 10_000,
  authenticationTimeout: 10_000
})

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner })

async function kafkaTopicProduce(message) {
  await producer.send({
    topic: KAFKA_TOPIC,
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
  try {
    await producer.connect()
    kafkaTopicProduce(JSON.stringify(req.body)).catch(console.error)
  } catch (error) {
    console.log('[ERROR-KafkaProducer]', error)
  }
  res.send("oldu")
})

module.exports = router