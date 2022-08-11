const express = require("express")
const app = express()
const session = require('express-session')
const MongoStore = require('connect-mongo')
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
require("dotenv").config()
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use(express.json())

const {mongoose} = require('./mongo.connection')

const indexRouter = require('./routers/index')
const userRouter = require('./routers/user')
const usersRouter = require('./routers/users')

app.use(
  session({
    secret: 'user-server',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      stringify: false
    })
  })
)

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/users', usersRouter)

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`)
  console.log("Up and running user service")
})