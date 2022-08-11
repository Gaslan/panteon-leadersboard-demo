const mongoose = require('mongoose')

const url = process.env.MONGO_URL || "mongodb://mongo:27017/users"

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("Connection established with User");
})
.catch(() => {
  console.log("Connection failed");
})

module.exports = { mongoose }