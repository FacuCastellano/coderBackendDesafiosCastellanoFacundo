const { Router } = require('express')
const {response} =require('express')
const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.
const passport = require('passport')
const userManager = require('../../dao/user.manager')
const isAuth = require('../../middelwares/userAuth')

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/sessions"

router.post('/singup', passport.authenticate('local-signup', {
  successRedirect: '/',
  failureRedirect: '/login'
}) )

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/',
  failureRedirect: '/login'
}) )


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
