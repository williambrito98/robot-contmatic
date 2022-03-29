const { Router } = require('express')
const connection = require('./database/connection')
const { sign } = require('jsonwebtoken')
const router = Router()
const { verifyJWT } = require('./utils/jwt')

router.post('/api/login', async (req, res) => {
  try {
    const conn = connection()
    const user = await conn.withSchema(process.env.DB_SCHEMA).table('users').where({ email: req.body.email, password: req.body.password }).first()
    if (user) {
      const token = sign({ userID: user.id }, process.env.SECRET_API, { expiresIn: 500 })
      return res.status(200).json({ auth: true, token })
    }
    await conn.destroy()
    return res.send({ message: 'Usuario ou senha incorreto', auth: false }).end()
  } catch (error) {
    console.log(error)
    return res.status(500).end()
  }
})

router.get('/api/users', verifyJWT, async (req, res) => {
  try {
    const conn = connection()
    const users = await conn.withSchema(process.env.DB_SCHEMA).table('users')
    return res.status(200).json(users).end()
  } catch (error) {
    console.log(error)
    return res.send({ message: 'CLIENTE NÃO ENCONTRADO', auth: false }).end()
  }
})

module.exports = router
