require('dotenv').config({ path: './.env' })
const fs = require('fs')
console.log('hola desde jwt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRETO_JWT

const createToken = (email, expiresIn = 3600) => {
  // 1er arg: payload, 2do arg:secretkey, 3er arg: options
  return (jwt.sign(
    {
      payload: {
        email,
      },
    },
    secretKey,
    { expiresIn }
  )) 
}

module.exports = createToken