const userManager = require('../dao/user.manager')

const isAuth = async (req, res, next) => {
  try {
    const email = req.session?.user?.email || null
    if (!email) {
      res.redirect('/login')
      return //--> no tengo muy claro pq este return ess necesario (osea se q se evita q se envien multiples respuestas pero no lo cazo muy bien)
    } else {
      req.user = await userManager.getInfoByMail(email)
    }

    next()
  } catch (err) {
    console.log('error en el middelware')
    console.log(err)
  }
}

module.exports = isAuth
