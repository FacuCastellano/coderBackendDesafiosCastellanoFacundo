const { Router } = require('express')
const {response} =require('express')
const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.
const userManager = require('../../dao/user.manager')
const isAuth = require('../../middelwares/userAuth')

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
    res.cookie("name", firstname, {maxAge: 10} )
    res.redirect("/")
    //res.send({ status: 'success', payload: req.body })
  } catch (err) {
    console.log('error en post user del session router')
    console.log(err)
  }
})

router.post('/login', async (req, res=response) => {
  try {
    const { email, password, } = req.body
    const user = await userManager.verifyUserPass({email:email.trim(),password})
    //si user = false, lo redirijo al login
    if(!user){
      console.log("usuario denegado")
      res.status(401)
      res.redirect('http://localhost:8080/login')
      return
    }
    
    req.session.user = user  // si user tiene un valor, lo guardo en la session.
    if(email === "adminCoder@coder.com"){
      req.session.user.role = "admin"
    }else{
      req.session.user.role = "user"
    }
    req.session.save((err)=>{
      if(err){
        console.log("error en el guardado de la session, en la rotura (post) login del homerouter")
        console.log(err)
      }
      
    })

    res.redirect('http://localhost:8080/')
 
  } catch (err) {
    console.log('error en post user del session router')
    console.log(err)
  }
})


//deberia ser un post, pero para q me lo tome el <a></a>, lo uso en get.
router.get('/logout', async (req, res=response) => {
  try {    

    req.session.destroy((err)=>{
      if(err){
        res.status(500).send('Error al intentar destruir la session');
        console.log(err)
      }else{
        res.clearCookie('connect.sid')
        res.redirect('http://localhost:8080/login')
      }
    })

  } catch (err) {
    console.log('error en get /logout del session router')
    console.log(err)
  }
})
//en esta ruta recupero los datos del usuario almacenado en el session de la cookie "connect.sid"
router.get('/user/info', async (req, res=response) => {
  try {    
    
    const {firstname,lastname,email} = await userManager.getById(req.session.user.id)
    
    res.send({firstname,lastname,email})
  } catch (err) {
    console.log('error en get /logout del session router')
    console.log(err)
  }
})



module.exports = router
