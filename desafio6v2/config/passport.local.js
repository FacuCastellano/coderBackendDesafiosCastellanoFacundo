const passport = require('passport')
const local = require('passport-local')
const userManager = require('../dao/user.manager')
const { hashPassword, isValidPassword } = require('../utils/password.utils')

const LocalStrategy = local.Strategy


const signup = async (req, email, password, done) => {
  const { password: _password, password2: _password2, ...user } = req.body
  const _user = await userManager.getByMail(email)

  if (_user) {
    console.log('usuario ya existe')
    return done(null, false)
  }

  try {
    const newUser = await userManager.add({
      ...user,
      password: hashPassword(_password)
    })
    const {_id, password:_passHashiado, __v, ...rest} =  newUser._doc
    //creo el rol
    let role
    if(userManager.email ===  "coderAdmin@gmail.com"){
      role = "admin"
    }else{
      role = "user"
    }
    const userToRetorn = {id:_id.toString(), ...rest,role}
    console.log(userToRetorn)
    // TODO: Borrar el password
    return done(null, userToRetorn  )

  } catch(e) {
    console.log('ha ocurrido un error')
    done(e, false)
  }
}

const login = async (email, password="", done) => {
  try {
    console.log("hola desde login")
    const _user = await userManager.getByMail(email)

    if (!_user) {
      console.log('usuario no existe')
      return done(null, false)
    }

    if (!isValidPassword(password, _user.password)) {
      console.log('credenciales no coinciden')
      return done(null, false)
    }

    console.log(_user)


    // TODO: borrar password
    done(null, _user)
  } catch (e) {
    console.log('ha ocurrido un error')
    done(e, false)
  }
}



const init = () => {
  /// options por default
  /// { usernamField: 'username', passwordField: 'password' }

  passport.use(
    'local-signup',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true }, signup))

  passport.use('local-login', new LocalStrategy({ usernameField: 'email' }, login))

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })
  passport.deserializeUser(async (id, done) => {
    const user = await userManager.getById(id)

    // TODO: borrar el password
    done(null, user)
  })
}

module.exports = init
