require('dotenv').config({ path: './.env' })
const fs = require("fs")
console.log('hola desde jwt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.SECRETO_JWT

const token = jwt.sign(
  {
    payload: {
      email: 'facu@gmail.com',
    },
  },
  secretKey,
  { expiresIn: 432400 }
)



try {
  fs.appendFileSync('./utils/jwtFile.txt', token);
  console.log('Contenido agregado correctamente al archivo');
} catch (err) {
  console.log('Error al escribir en el archivo');
}



// valid token - synchronous
try {
  const decoded = jwt.verify(token, secretKey)
  //console.log(decoded)
  
  setTimeout(() => {
    try {
      const decoded = jwt.verify(token, secretKey)
      //console.log(decoded)
    } catch (err) {
      console.log(err.message)
    }
  }, 2000)
} catch (err) {
  console.log(err.message)
}

// invalid token - synchronous
try {
  const decoded = jwt.verify(token, 'wrong-secret')
} catch (err) {
  console.log(err.message)
}




