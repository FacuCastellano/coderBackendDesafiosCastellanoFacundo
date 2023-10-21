const logger = require('../logger')
const { CustomError, ErrorType } = require('../errors/custom.error')

class TestController{
  
  static logger = async (req, res, next) => {
    try {

      
      res.send('hola mundo')







    } catch (err) {
      next(
        new CustomError(err.message, ErrorType.DB, 'CartController-getProducts')
      )
      //res.send({ status: 'Error', Error: e.message })
    }
  }
}

module.exports = TestController