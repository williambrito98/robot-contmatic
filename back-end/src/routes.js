const { Router } = require('express')
const connection = require('./database/connection')
const { sign } = require('jsonwebtoken')
const { verifyJWT } = require('./utils/jwt')
const { readFileSync, existsSync, appendFileSync } = require('fs')
const { join } = require('path')
const pathLogFile = join(__dirname, 'log', 'log.txt')
const router = Router()

const statusRobot = {
  status: 'parado'
}

router.post('/api/login', async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.send({ message: 'Usuario ou senha incorreto' }).end()
    }
    const conn = connection()
    const user = await conn.withSchema(process.env.DB_SCHEMA).table('users').where({ email: req.body.email, password: req.body.password }).first()
    if (Object.keys(user).length !== 0) {
      const token = sign({ userID: user.id }, process.env.SECRET_API, { expiresIn: 500 })
      return res.status(200).json({ token, auth: true })
    }

    await conn.destroy()
    return res.send({ message: 'Usuario ou senha incorreto' }).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
})

router.post('/api/run', verifyJWT, async (req, res) => {
  try {
    if (statusRobot.status !== 'parado') {
      return res.send({ message: 'Já existe uma instancia do robo rodando' }).end()
    }
    statusRobot.status = 'rodando'
    return res.status(200).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
})

router.get('/api/log', verifyJWT, async (req, res) => {
  try {
    if (!existsSync(pathLogFile)) {
      return res.send('').end()
    }
    const content = readFileSync(pathLogFile).toString().split('\n')
    return res.send(content).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
})

router.get('/api/statusRobot', verifyJWT, async (req, res) => {
  try {
    return res.send({
      status: statusRobot.status
    }).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
})


router.post('/api/log', verifyJWT, async (req, res) => {
  try {
    appendFileSync(pathLogFile, req.body.log)
    return res.status(200).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
})

router.post('/api/schedule', verifyJWT, async (req, res) => {
  try {
    const conn = connection()
    await conn.withSchema(process.env.DB_SCHEMA).table('schedule').insert({
      date: req.body.date,
      servidor: req.body.servidor,
      codigos: req.body.codigos.join(','),
      anos: req.body.anos.join(','),
      meses: req.body.meses.join(',')
    })
    await conn.destroy()
    return res.send(200).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
})


router.get('/api/schedule', verifyJWT, async (req, res) => {
  try {
    const conn = connection()
    const result = await conn.withSchema(process.env.DB_SCHEMA).table('schedule').select('*')
    result.map(item => {
      item.date = new Date(item.date).toLocaleString()
      return item
    })
    await conn.destroy()
    return res.send(result).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
})

router.post('/api/schedule/remove', verifyJWT, async (req, res) => {
  try {
    const conn = connection()
    await conn.withSchema(process.env.DB_SCHEMA).table('schedule').where({ id: req.body.id }).delete()
    await conn.destroy()
    return res.send({ message: 'agendamento excluido com sucesso' }).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
})

module.exports = router
