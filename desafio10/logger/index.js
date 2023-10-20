console.log('estoy ejecutando el logger')
const { enviroment } = require('../config/process.config')
const {
  createLogger,
  transports: { Console, File },
  format: { combine, colorize, simple },
} = require('winston')

console.log('valor de enviroment:', enviroment)
let consoleLevel

if (enviroment === 'production') {
  consoleLevel = 'info'
} else if (enviroment === 'development') {
  consoleLevel = 'debug'
}

const options = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: 'red',
    error: 'red',
    warning: 'yellow',
    info: 'blue',
    http: 'blue',
    debug: 'white',
  },
}

const logger = createLogger({
  transports: [
    new Console({
      level: consoleLevel,
      format: combine(colorize({ colors: options.colors }), simple()),
    }),
    new File({
      filename: `./logs/${enviroment ? enviroment : 'others'}/error.log`,
      level: 'info',
      format: simple(),
    }),
  ],
})

module.exports = logger
