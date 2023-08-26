console.log("hola desde password utils")

const bcrypt = require('bcrypt')

const hashPassword = (password) => {
  const salt = bcrypt.genSaltSync(10)
  const passHashed= bcrypt.hashSync(password, salt)
  console.log("salt: ",salt)
  console.log("passHashed: ",passHashed)
  return passHashed
  
}


const isValidPassword = (pwd1, pwd2) => {
  //pwd1 = pass a validar
  //pwd2 = pass hashiado (el de la BD)
  return bcrypt.compareSync(pwd1, pwd2)
}

module.exports = { hashPassword, isValidPassword }


// const miPass=hashPassword("123")
// console.log(isValidPassword("123",miPass)) --> true