const express = require("express")
const router = express.Router()
const User = require("../models/user.model")

router.post("/", (req, res) => {
  User.find({ username: {$in : req.body}})
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

module.exports = router
