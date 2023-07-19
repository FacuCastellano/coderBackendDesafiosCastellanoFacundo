const { Router } = require('express')
const { ProductManager } = require('../../managers/productManager')

const myProducts = new ProductManager('products.json')
const router = Router()

router.get('/', (req, res) => {
  const products = myProducts.getProducts()
  res.render('products', {
    products,
    route: {
      hasCSS: false,
      cssFile: null,
      hasSocket: false,
      hasJsFile: false,
      jsFile: null,
    },
  })
})

router.get('/realtimeproducts', (req, res) => {
  const products = myProducts.getProducts()
  res.render('realtimeproducts', {
    products,
    route: {
      hasCSS: true,
      cssFile: "realtimeproducts.css",
      hasSocket: true,
      hasJsFile: true,
      jsFile: 'realtimeproducts.js',
    },
  })
})

module.exports = router
