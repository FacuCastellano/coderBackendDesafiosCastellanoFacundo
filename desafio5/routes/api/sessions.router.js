const { Router } = require('express')
const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.
const userManager = require('../../dao/user.manager')

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/sessions"

router.post('/singup', async (req, res) => {
  try {

    console.log("entre al api/session/singup")
    const { firstname, lastname, email, age, gender, password, password2 } = req.body

    
    console.log(password, password2)
    if(password !== password2){
      //si los pass no coinciden redirecciono al sing-up mostrando el error
      res.render('singup', {
        error:"the passwords doesn't match",
        route: {
          hasCSS: false,
          cssFile: null,
          hasSocket: true,
          hasJsFile: false,
          jsFile: null,
        },
      })
      return 
    }

    
    
    // product = await userManager(user);
    res.send({ status: 'success', payload: req.body })
  } catch (err) {
    console.log('error en post user del session router')
    console.log(err)
  }
})

module.exports = router
