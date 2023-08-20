const express = require('express')
const { api } = require('./routes/mainRoutes')
const http = require('http')
const path = require('path')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const socketManager = require('./websocket')

PORT = 8080



//settings del motor de plantilla
app.engine('handlebars', handlebars.engine()) // registramos handlebars como motor de plantillas
app.set('views', path.join(__dirname, '/views')) // el setting 'views' = directorio de vistas
app.set('view engine', 'handlebars') // setear handlebars como motor de plantillas

//sirvo la carpeta public
app.use('/static', express.static(path.join(__dirname + '/public')))


//middelwares para dar formato
app.use(express.urlencoded({ extended: true })) // --> dar formato a los parametros query
app.use(express.json()) // -->para parsear el JSON enviados en el body

//inserto el io en la request.
app.use((req,res,next)=>{
  req.io = io
  next()
})


//router de API REST
app.use('/api', api)

//seteo para q el socket-io, esccuhe las peticiones websocket
io.on('connection', socketManager)



server.listen(PORT, () => {
  console.log(`corriendo en puerto ${PORT}`)
})
