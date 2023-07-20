const { Router } = require('express')
const { ProductManager } = require('../../managers/productManager')
const myProducts = new ProductManager('products.json')
const router = Router() //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.
const express = require("express")
const http = require("http")
const {Server}=require("socket.io")
const app2 = express()
const server2 = http.createServer(app2) // server http montado con express
const io2 = new Server(server2)

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/products"

//ruta 1, acepta un query parm "limit", que limita la cantidad de productos, si no esta este limite, se traen todos los productos.
router.get('/', (req, res) => {
  const limit = req.query.limit

  // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
  if (isNaN(limit) && limit !== undefined) {
    res.send({
      status: 'Error',
      Error: 'El valor (limit) enviado no es valido',
    })
    return
  }
  if (!limit) {
    res.send({ status: 'success', payload: myProducts.getProducts() })
    return //este return vacio es para cortar la funcion, sino tira como un "error" segun la correccion de mayra, si yo lo saco no veo ese error
  }
  const productsToshow = myProducts.getProducts().slice(0, limit)
  res.send({ status: 'success', payload: productsToshow })
})

//ruta 2, trae le producto cuyo id se le pase como Url Param.
router.get('/:pid', (req, res) => {
  const id = req.params.pid
  // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
  if (isNaN(id)) {
    res.send({
      status: 'Bad Requests, (id)  must be a integer number',
      payload: null,
    })
    return //este return vacio es para cortar la funcion, sino tira como un "error" segun la correccion de mayra, si yo lo saco no veo ese error
  }
  let product
  try {
    product = myProducts.getProductById(+id)
    res.send({ status: 'success', payload: product })
  } catch {
    res.send({ status: 'Product Not Found', payload: null })
  }
})

//ruta 3, ruta post para crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const productToAdd = req.body
    const wasProductCreated = await myProducts.addProduct(productToAdd)
    if (wasProductCreated) {
      const id = await myProducts.getProductIdByCode(productToAdd.code)
      productToAdd.id = id 
      req.io.emit("productAdded", {'wasProductCreated':wasProductCreated,'productToAdd':productToAdd})  //-->NO entiendo pq asi anda como si fuera un broadcast, pero si pongo el broadcas, como en la linea de abajo no.
      //req.io.broadcast.emit("productAdded", {'wasProductCreated':wasProductCreated,'productToAdd':productToAdd})
      res.status(200)
      res.send({ status: 'Success, the product was created' })
    }
  } catch (e) {
    console.log(e)
    res.status(500).send({ status: 'Error, the product was not created' })
  }
})

//ruta 4 ruta put modificar ciertas propiedades de un producto
router.put('/:pid', async (req, res) => {
  try {
    const productId = +req.params.pid
    const newPropiertiesValues = req.body
    await myProducts.updateProductById(productId, newPropiertiesValues)
    res.send({ status: `Success, the product id:${productId} was updated` })
  } catch (e) {
    res.status(500).send({ status: 'Error', 'Error type': e.message })
  }
})

//ruta 5, ruta post para eliminar producto
router.delete('/:pid', async (req, res) => {
  try {
    const pid = +req.params.pid
    myProducts.deleteProductById(pid)
    req.io.emit("productDeleted", {'wasProductDeleted':true,'productDeletedId':pid})  //-->NO entiendo pq asi anda como si fuera un broadcast, pero si pongo el broadcas, como en la linea de abajo no.
    //req.io.broadcast.emit("productDeleted", {'wasProductDeleted':true,'productDeletedId':pid})
    console.log("emitido productDeleted desde el server")
    res.send({ status: `Success, the product id:${pid} was deleted` })
    return
  } catch (err) {
    res.send({ status: 'Error', 'Error type': err.message })
  }
})

module.exports = router
