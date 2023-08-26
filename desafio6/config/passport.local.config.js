// generar nuestra estrategia de passport
const passport = require('passport')
const local = require('passport-local')

const userManager = require('../dao/user.manager')
const { hashPassword, isValidPassword } = require('../utils/password.utils')

//genero la estrategia local (usuario y contraseña)
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
      password: hashPassword(password),
    })

    //desestructuro para enviar lo que quiero al req.user.
    const { password, __v, _id: id, ...userForRequest } = newUser

    //lo que mando como segundo parametro del done(), es lo que voy a almacenar en el req.user (es la magia de passport),
    // ver para que es el primer parametro.. creo q es para cuando hay un error pero nose bien, como funcionaria
    return done(null, {
      ...userForRequest,
      id: id.toString(),
    })
  } catch (e) {
    console.log('ha ocurrido un error')
    done(e, false)
  }
}

const login = async (email, password, done) => {
  try {
    const _user = await userManager.getByMail(email)

    if (!_user) {
      console.log('usuario no existe')
      return done(null, false)
    }

    if (!password) {
      return done(null, false)
    }

    if (!isValidPassword(password, _user.password)) {
      console.log('credenciales no coinciden')
      return done(null, false)
    }

    const { password, __v, _id: id, ...userForRequest } = _user
    
    done(null, {
      ...userForRequest,
      id: id.toString(),
    })
    
  } catch (e) {
    console.log('ha ocurrido un error')
    done(e, false)
  }
}

//voy a exportar una funcion, que cuando la importe se va a ejecutar y ahi se inicializan las estrategias de passport que defini aca.
const init = () => {
  // options por default
  // opciones por default --> { usernamField: 'username', passwordField: 'password' }, como en mi req.body del sing-up el "userio" es en realidad el "mail", lo tengo que modificar, el "password" si se llama "password" por eso lo dejo por default.
  // el passReqToCallBack, hace que el primer argumento del callbak(sing-up) sea el request

  passport.use(
    'local-signup', // el nombre de la estrategia
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true }, //esto es segun la documentacion de la estrategia particular que este aplicando.
      signup // el callback definido arriba.
    )
  )

  passport.use(
    'local-login',
    new LocalStrategy({ usernameField: 'email' }, 
    login
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user.id) //aca lo que guardo en la serializacion es lo q voy a usar cuando deserealize para recuperar el usuario
  })
  passport.deserializeUser(async (id, done) => {
    const user = await userManager.getById(id)
    const { password, __v, _id, ...userForRequest } = user
    // TODO: borrar el password
    done(null, {
      ...userForRequest,
      id: _id.toString(),
    })
  })
}
//lo exporto con los () para inicializarlo antes de exportarlo y exportar la el return de la funcion
module.exports = init
