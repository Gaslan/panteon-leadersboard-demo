const mongoose = require('mongoose')
const url = process.env.MONGO_URL || "mongodb://mongo:27017/users"

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

module.exports = { mongoose }