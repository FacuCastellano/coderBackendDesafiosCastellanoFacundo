const { Router } = require('express')
const RoutePolices = require('../../middelwares/routes.polices')
const HomeController = require('../../controllers/home.controllers')
const isAuth = require('../../middelwares/userAuth')
const isAuthToken = require('../../middelwares/userAuthToken')
const router = Router()

//estas rutas no tienen prefijo (api) son las visualizaciones del home.
router.get('/', isAuth, HomeController.showHome)

router.get('/carts/', HomeController.redirectToHome)

//ruta para listar los productos de un cart
router.get('/carts/:cid', isAuth, HomeController.showCartProducts)

router.get('/chat', isAuth, HomeController.showChat)

router.get('/realtimeproducts', HomeController.showRealTimeProducts)

router.get('/singup', HomeController.showSingup)

router.get('/login', HomeController.showLogin)

router.get('/profile', isAuth, HomeController.showProfile)

router.get('/refresh-pass', isAuthToken, HomeController.refreshPass)

module.exports = router
