const { Router } = require('express')
const UserController = require('../../controllers/user.controller')
const isAuthToken =require("../../middelwares/userAuthToken")

const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

// TODAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/users"

router.post('/refresh-pass',isAuthToken, UserController.refreshPassword) //crea un carrito nuevo (pero tengo que asociarlo a un userId)


module.exports = router