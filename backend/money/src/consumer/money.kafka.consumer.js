const { Kafka } = require('kafkajs')
const saveMoney = require('../service/money.post')

const TOPIC = 'money6-topic'
const BROKER_URL = process.env.BROKER_URL || 'localhost';
const BROKER_PORT = process.env.BROKER_PORT || '9092';

const kafka = new Kafka({
  clientId: 'my-app',
  brokers: [`${BROKER_URL}:${BROKER_PORT}`]
})

const consumer = kafka.consumer({
  groupId: 'money-group'
})

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const jsonObj = JSON.parse(message.value.toString())
        // console.log(
        //   '******* Alert!!!!! passengerInfo *********',
        //   jsonObj
        // )
        saveMoney(jsonObj)
      } catch (error) {
        console.log('err=', error)
      }
    }
  })
}
  
run().catch(e => console.error(`[example/consumer] ${e.message}`, e))