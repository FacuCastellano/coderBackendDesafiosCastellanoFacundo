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






// router.post('/login', async (req, res=response) => {
//   try {
//     const { email, password, } = req.body
//     const user = await userManager.verifyUserPass({email:email.trim(),password})
//     //si user = false, lo redirijo al login
//     if(!user){
//       console.log("usuario denegado")
//       res.status(401)
//       res.redirect('http://localhost:8080/login')
//       return
//     }
    
//     req.session.user = user  // si user tiene un valor, lo guardo en la session.
//     if(email === "adminCoder@coder.com"){
//       req.session.user.role = "admin"
//     }else{
//       req.session.user.role = "user"
//     }
//     req.session.save((err)=>{
//       if(err){
//         console.log("error en el guardado de la session, en la rotura (post) login del homerouter")
//         console.log(err)
//       }
      
//     })

//     res.redirect('http://localhost:8080/')
 
//   } catch (err) {
//     console.log('error en post user del session router')
//     console.log(err)
//   }
// })


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
