const mongoose = require('mongoose')
const userManager = require('../dao/user.manager')
const cartManager = require('../dao/cart.manager')
const { response} = require('express')
//mail: Craig2@hotmail.com
//pass: Om1zfU1k7hSB
//cart: 64d522223398fe0ee7b278f8

//mail: Joanna.Watsica40@yahoo.com
//pass: Ujh0Cm3lQFPg9o
//cart: 64dd1ad318aef2b6cbe76f8e



const isAuth = async (req, res=response, next) => {
  try {
    const email = req.session?.user?.email || null
    

      if (!email) {
        res.redirect('/login')
        return //--> no tengo muy claro pq este return ess necesario (osea se q se evita q se envien multiples respuestas pero no lo cazo muy bien)
      } else {
        req.user = await userManager.getInfoByMail(email)
        const userId =  new mongoose.Types.ObjectId(req.session.user.id)
        const cart = await cartManager.getByUserId(userId)
        if(!cart){
          //si no tiene carrito le creo uno y recupero el cartId
          const newCart = await cartManager.createCart({userId:req.session.user.id})
          req.user.cart = newCart._id.toString()
          
        }else{
          //si tiene carrito, recupero el cartId
          req.user.cart = cart._id.toString()
        }
  
        res.cookie('cartId',req.user.cart)
      }
    
    
    

    next()
  } catch (err) {
    console.log('error en el middelware')
    console.log(err)
  }
}

module.exports = isAuth
