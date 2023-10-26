const { response } = require('express')
const passport = require('passport')
const { factoryManager } = require('../config/process.config')
const { hashPassword } = require('../utils/password.utils')
const { CustomError, ErrorType } = require('../errors/custom.error')
const mailSenderService = require('../services/mail.sender.service')
const createToken = require('../utils/jwt.utils')

const userManager = factoryManager.userManager
class UserController {
  static sendMailToRefreshPassword = async (req, res = response, next) => {
    try {
      const email = req.body.email
      const token = createToken(email) // como segundo argumento puedo poner el tiempo de expiracion (segundos) por defecto es 3600
      await mailSenderService.send(email,token)
      res.redirect('/login')
    } catch (err) {
      next(
        new CustomError(
          err.message,
          ErrorType.Otro,
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
          ErrorType.Otro,
          'UserController-refreshPassword'
        )
      )
    }
  }
}

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/user

module.exports = UserController
