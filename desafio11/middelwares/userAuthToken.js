const passport = require('passport')
const logger = require('../logger')
function isAuthToken(req, res, next) {

  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      // Manejo de errores
      return next(err);
    }

    if (!user) {
      // El usuario no está autenticado
      return res.status(401).json({ message: 'No estás autenticado' });
    }

    // El usuario está autenticado, puedes almacenar el usuario en el objeto de solicitud si lo deseas
    req.user = user;

    // Continúa con el siguiente middleware o controlador
    next();
  })(req, res, next);
}

module.exports = isAuthToken
