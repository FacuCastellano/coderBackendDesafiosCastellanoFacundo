const { factoryManager } = require('../config/process.config')
const productsMocker = require('../utils/mocking.products')
const productManager = factoryManager.productManager
const { CustomError, ErrorType } = require('../errors/custom.error')

class ProductController {
  // acepta un query parm "limit", que limita la cantidad de productos, si no esta este limite, se traen todos los productos.
  //tmb adimite un query param "page", para poder hacer paginacion, si no esta trae la primera pagina.
  static getAll = async (req, res, next) => {
    try {
      const { limit, page, sort, query } = req.query
      // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
      if (isNaN(limit) && limit !== undefined) {
        res.send({
          status: 'Error, the (limit) value is wrong',
          payload: null,
        })
        return
      }
      if (isNaN(page) && page !== undefined) {
        res.send({
          status: 'Error, the (page) value is wrong',
          payload: null,
        })
        return
      }
      const data = await productManager.getAllPaginated({
        limit,
        page,
        sort,
        query,
      })

      res.status(200).send(data)
      return
    } catch (err) {
      next(
        new CustomError(
          'No se pudo obtener los productos',
          ErrorType.DB,
          'ProductController-getAll'
        )
      )
    }
  }

  //ruta 2,  router.get('/:pid')
  //trae le producto cuyo id se le pase como Url Param.
  static getOne = async (req, res, next) => {
    try {
      const id = req.params.pid
      product = await productManager.getById(id)
      res.send({ status: 'success', payload: product })
    } catch (err) {
      console.log(1)
      next(
        new CustomError(
          'No se encontro el producto',
          ErrorType.DB,
          'ProductController-getOne'
        )
      )
      //res.send({ status: 'product not found', payload: null })
    }
  }

  //ruta 3,  router.post('/')
  // ruta post para crear un nuevo producto
  static create = async (req, res, next) => {
    try {
      const product = req.body
      //const info = await productManager.add(product);
      const {
        _id: id,
        title,
        price,
        category,
        description,
      } = await productManager.add(product)

      req.io.emit('productAdded', {
        status: 'success',
        product: { id, title, price, category, description },
      })
      res.send({ status: 'success', productId: id })
    } catch (err) {
      next(
        new CustomError(
          'No se pudo crear el producto',
          ErrorType.DB,
          'ProductController-create'
        )
      )
      //res.status(500).send({ status: 'Error, the product was not created' })
    }
  }

  //ruta 4     router.patch('/:pid')  (message, type, intrinsecMessage,place)
  //ruta put modificar ciertas propiedades de un producto
  static updatePropierties = async (req, res, next) => {
    try {
      const id = req.params.pid
      const newPropiertiesValues = req.body
      const productUpdated = await productManager.updateById(
        id,
        newPropiertiesValues
      )
      res.send({ status: 'success', payload: productUpdated })
    } catch (err) {
      next(
        new CustomError(
          'No se pudo updatear el producto',
          ErrorType.DB,
          'ProductController-updatePropierties'
        )
      )
      //res.status(500).send({ status: 'Error', 'Error type': e.message })
    }
  }

  //ruta 5,  router.delete('/:pid')
  //ruta post para eliminar producto
  static deleteProduct = async (req, res, next) => {
    try {
      const id = req.params.pid
      const info = await productManager.deleteById(id)
      req.io.emit('productDeleted', { status: 'success', productId: id })
      if (info.deletedCount === 1) {
        res.send({ status: `success, the product with id:${id} was deleted` })
        return
      }
      res.status(404).send({ status: `error, product not found` })
      return
    } catch (err) {
      next(
        new CustomError(
          'No se pudo eliminar',
          ErrorType.DB,
          'ProductController-deleteProduct'
        )
      )
      //res.send({ status: 'Error', 'Error type': err.message })
    }
  }

  static getMockersProducts = async (req, res, next) => {
    try {
      res.status(200).send({ status: 'success', payload: productsMocker(100) })
      return
    } catch (err) {
      next(
        new CustomError(
          'No se pudo obtener los productos',
          ErrorType.DB,
          'ProductController-getMockersProducts'
        )
      )
      //res.send({ status: 'Error', 'Error type': err.message })
    }
  }
}

module.exports = ProductController
