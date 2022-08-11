const express = require("express")
const app = express()
const morgan = require("morgan")
const helmet = require("helmet")
const cors = require("cors")
require("dotenv").config()
app.use(morgan("dev"))
app.use(helmet())
app.use(cors())
app.use(express.json())

const moneyIndexRouter = require('./routers/money/index')

app.use('/money', moneyIndexRouter)

const port = process.env.PORT || 3008;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`)
  console.log("Up and running scripts service")
})