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

const indexRouter = require('./routers/index')

app.use('/', indexRouter)

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Listening: http://localhost:${port}`)
  console.log("Up and running leadersboard service")
})