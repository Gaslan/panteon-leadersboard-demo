const mongoose = require("mongoose")

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  countryCode: {
    type: String,
    required: true
  }
})

module.exports = User