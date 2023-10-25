const { response } = require('express')
const passport = require('passport')
const { factoryManager } = require('../config/process.config')
const { hashPassword } = require('../utils/password.utils')

const userManager = factoryManager.userManager

class UserController {

  static refreshPassword = async (req, res = response) => {
    try {
      const id = req.user._id //lo saco del user que me da el token, para seguridad.
      const passwordNew = hashPassword(req.body.password)
      userManager.updateById(id,{password:passwordNew})
      
      res.send('pass actualizado')
    } catch (err) {
      next(
        new CustomError(
          'No se pudo cambiar el password',
          ErrorType.DB,
          'UserController-refreshPassword'
        )
      )
    }
  }


}

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/user

module.exports = UserController
