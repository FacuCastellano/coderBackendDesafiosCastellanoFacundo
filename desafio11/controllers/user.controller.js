const { response } = require('express')
const passport = require('passport')
const { factoryManager } = require('../config/process.config')
const { hashPassword } = require('../utils/password.utils')
const { CustomError, ErrorType } = require('../errors/custom.error')

const userManager = factoryManager.userManager
class UserController {
  static sendMailToRefreshPassword = async (req, res = response, next) => {
    try {
      const email = req.body.email
      res.send('enviando mail a:', email)
    } catch (err) {
      next(
        new CustomError(
          err.message,
          ErrorType.OTRO,
          'UserController-sendMailToRefreshPassword'
        )
      )
    }
  }

  static refreshPassword = async (req, res = response, next) => {
    try {
      const id = req.user._id //lo saco del user que me da el token, para seguridad.
      const passwordNew = hashPassword(req.body.password)
      userManager.updateById(id, { password: passwordNew })

      res.redirect('/login')
    } catch (err) {
      next(
        new CustomError(
          'No se pudo cambiar el password',
          ErrorType.OTRO,
          'UserController-refreshPassword'
        )
      )
    }
  }
}

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/user

module.exports = UserController
