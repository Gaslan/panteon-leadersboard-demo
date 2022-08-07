const express = require("express");
const app = express();
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

const userModel = require("./user.model.js")
const User = mongoose.model('user', userModel)
const url = process.env.MONGO_URL || "mongodb://mongo:27017/users"

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection established with Book");
  })
  .catch(() => {
    console.log("Connection failed");
  })

app.get("/", (req, res) => {
  res.send("This is users service necmetin8");
})


app.get("/user", (req, res) => {
  User.find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
})

app.post("/user", (req, res) => {
  console.log(req.body, 'kemal', typeof req.body)
  const user = new User(req.body);
  user
    .save()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});



app.post("/users", (req, res) => {
  User.find({ username: {$in : req.body}})
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`)
  console.log("Up and running books service")
})