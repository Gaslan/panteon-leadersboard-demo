const {createClient} = require('redis')

async function saveMoney(moneyObj) {
  try {
    const moneyEarnedDate = new Date(moneyObj.datetime)
    const score = moneyObj.amount
    const obj = moneyObj.username

    // Add money to daily leadersboard
    addDaily(obj, score, moneyEarnedDate)

    // Add money to weekly leadersboard
    addWeekly(obj, score, moneyEarnedDate)

    // Add money to weekly prize pool
    addPrizePool(score, moneyEarnedDate)
  } catch (e) {
    console.error(e)
    throw e
  }
}

function addDaily(obj, score, date) {
  const key = `igm:daily:${getKeyForDaily(date)}`
  addRedis(key, score, obj)
}

function addWeekly(obj, score, date) {
  const key = `igm:weekly:${getKeyForWeekly(date)}`
  addRedis(key, score, obj)
}

function addPrizePool(score, date) {
  const key = `igm:prizepool:${getKeyForWeekly(date)}`
  const maneyForPrizePool = Math.floor(score * 20 / 100)
  addRedisPrizePool(key, maneyForPrizePool)
}

function getKeyForDaily(date) {
  return formatDateForKey(date)
}

function getKeyForWeekly(date) {
  const previousStartOfWeek = getPreviousStartOfWeek(date)
  const nextEndOfWeek = getNextEndOfWeek(date)
  return `${formatDateForKey(previousStartOfWeek)}-${formatDateForKey(nextEndOfWeek)}`
}

function formatDateForKey(date) {
  return date.toISOString().slice(0, 10).replaceAll('-', '')
}

function getNextEndOfWeek(date) {
  // https://stackoverflow.com/a/33078673/3122912
  const targetDay = 7
  const tempDate = new Date(date)
  tempDate.setDate(tempDate.getDate() + (((targetDay + 7 - tempDate.getDay()) % 7) || 7))
  return tempDate
}

function getPreviousStartOfWeek(date) {
  // https://stackoverflow.com/a/33078673/3122912
  const targetDay = 1
  const tempDate = new Date(date)
  tempDate.setDate(tempDate.getDate() - ((tempDate.getDay() + 6) % 7))
  return tempDate
}

async function addRedis(key, score, obj) {
  try {
    const redisClient = createClient({
      url: 'redis://redis'
    })
    await redisClient.connect()
    redisClient.zIncrBy(key, score, JSON.stringify(obj))
    await redisClient.quit()
  } catch (e) {
    console.error(e)
    throw e
  }
}

async function addRedisPrizePool(key, value) {
  try {
    const redisClient = createClient({
      url: 'redis://redis'
    })
    await redisClient.connect()
    redisClient.incrBy(key, value)
    await redisClient.quit()
  } catch (e) {
    console.error(e)
    throw e
  }
}

module.exports = saveMoney
