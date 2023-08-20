const { Router } = require('express')
const {response} =require('express')
const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.
const userManager = require('../../dao/user.manager')

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/sessions"

router.post('/singup', async (req, res=response) => {
  try {
    const userNew = req.body
    const { firstname, address,lastname, email, age, sex, password, password2 } = userNew
    let error
    
    if( !firstname || !lastname  || !address || !email || !age  || !sex || !password || !password2){
      error = "You must fill all the fields"
    } else if(password !== password2){
      error = "The passwords doesn't match"
    } else if( isNaN(age)){
      error = "Age must be a number"
    } else if (await userManager.getByMail(email)) {
      error = "This mail had already regitered"
    } 
    //podria agregar mas validaciones
    if(error){
      res.render('singup', {
        error,
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

    await userManager.add(userNew)
    res.cookie("name", firstname, {maxAge: 10*1000} )
    res.redirect("/")
    //res.send({ status: 'success', payload: req.body })
  } catch (err) {
    console.log('error en post user del session router')
    console.log(err)
  }
})

module.exports = router
