const express = require("express")
const router = express.Router()
const User = require("../models/user.model")

router.get("/", (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(400).send(err)
    });
})
  
router.post("/", (req, res) => {
  User(req.body)
    .save()
    .then((data) => {
      res.status(200).send(data)
    })
    .catch((err) => {
      res.status(400).send(err)
    })
})

module.exports = router
