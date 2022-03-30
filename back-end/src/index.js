const { config } = require('dotenv')
const express = require('express')
const { join, parse } = require('path')
const routes = require('./routes')
const cors = require('cors');
(async () => {
  config({
    path: join(parse(__dirname).dir, '.env')
  })

  const app = express()
  app.use(cors())
  app.use(express.urlencoded())
  app.use(express.json())
  app.use(routes)
  app.use(express.static("../front-end/build"))
  app.listen(process.env.SERVER_PORT, () => {
    console.log('SERVER RUNNING IN PORT ' + process.env.SERVER_PORT)
  })
})()
