const { verify } = require('jsonwebtoken')

module.exports = {
  verifyJWT: (req, res, next) => {
    const token = req.headers['x-access-token']
    // @ts-ignore
    verify(token, process.env.SECRET_API, (err, decoded) => {
      if (err) return res.sendStatus(401).end()
      // @ts-ignore
      req.userID = decoded.userID
      next()
    })
  }

}
