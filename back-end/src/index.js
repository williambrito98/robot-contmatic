const { config } = require('dotenv')
const express = require('express')
const { join, parse, resolve } = require('path')
const routes = require('./routes')
const cors = require('cors');
const { existsSync, mkdirSync } = require('fs');
(async () => {
  config({
    path: join(parse(__dirname).dir, '.env')
  })

  if (!existsSync(resolve('./uploads'))) {
    mkdirSync(resolve('./uploads'))
  }

  if (!existsSync(resolve('./log'))) {
    mkdirSync(resolve('./log'))
  }

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
