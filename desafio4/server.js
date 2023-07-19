const express = require('express')
const { api } = require('./routes/mainRoutes')
const http = require('http')
const path = require('path')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const socketManager = require('./websocket')

PORT = 8080

//settings del servidor / express /socket.io
const app = express()
const server = http.createServer(app) // server http montado con express
const io = new Server(server) // web socket montado en el http

//settings del motor de plantilla
app.engine('handlebars', handlebars.engine()) // registramos handlebars como motor de plantillas
app.set('views', path.join(__dirname, '/views')) // el setting 'views' = directorio de vistas
app.set('view engine', 'handlebars') // setear handlebars como motor de plantillas

//sirvo la carpeta public
app.use('/static', express.static(path.join(__dirname + '/public')))

//middelwares para dar formato
app.use(express.urlencoded({ extended: true })) // --> dar formato a los parametros query
app.use(express.json()) // -->para parsear el JSON enviados en el body

//router de API REST
app.use('/api', api)

//seteo para q el socket-io, esccuhe las peticiones websocket
io.on('connection', socketManager)

server.listen(PORT, () => {
  console.log(`corriendo en puerto ${PORT}`)
})
