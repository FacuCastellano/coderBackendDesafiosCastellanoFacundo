const socket = io() //lo cargo en un elementro script en el html
const form = document.getElementById('formAddProduct')
const formContainer = document.getElementById('form-container')
formContainer.appendChild(form)

const buttonForm = document.getElementById('button-form')
const productContainner = document.getElementById('products')

//socket escuchar evento de producto agregado
socket.on('productAdded', (data) => {
  console.log('entre con productDeleted directo de  la ruta (POST)api/project/')
  if (data.wasProductCreated) {
    const product = data.productToAdd
    const div = document.createElement('div')
    div.id = `productID-${product.id}`
    div.innerHTML = `
    <div class='uk-card uk-card-default'>
      <div class='uk-card-media-top'>
        <img alt='foto producto' />
      </div>
      <div class='uk-card-body'>
        <h3 class='uk-card-title'>${product.title}</h3>
        <h5>USD ${product.price}</h5>
        <span class='uk-badge'>${product.category}</span>
        <p>${product.description}</p>
        <button class='uk-button uk-button-secondary uk-button-small'>Agregar al
          carrito</button>
      </div>
    </div>
    `
    productContainner.appendChild(div)
  }
})

//socket escuchar evento de producto eliminado
socket.on('productDeleted', (data) => {
  console.log(
    'entre con productDeleted directo de  la ruta (DELETE)api/project/pid'
  )
  if (data.wasProductDeleted) {
    const productId = data.productDeletedId
    const productToDelete = document.getElementById(`productID-${productId}`)
    console.log(productToDelete)
    productToDelete.remove()
  }
})

//funcion para controlar el envio del form
buttonForm.addEventListener('click', async (event) => {
  console.log('click')
  const title = form.elements['title'].value
  const description = form.elements['description'].value
  const price = +form.elements['price'].value
  const code = form.elements['code'].value
  const stock = +form.elements['stock'].value
  const thumbnails = []
  thumbnails.push(
    form.elements['thumbnails1'].value,
    form.elements['thumbnails2'].value,
    form.elements['thumbnails3'].value
  )

  let status
  if (form.elements['status'].value === 'on') {
    status = true
  } else {
    status = false
  }
  const category = form.elements['category'].value

  const newProduct = {
    title,
    description,
    price,
    code,
    stock,
    status,
    category,
    thumbnails,
  }

  console.log(newProduct)
  const response = await fetch('http://localhost:8080/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(newProduct),
  })

  console.log(response)
  form.elements['title'].value = ''
  form.elements['description'].value = ''
  form.elements['price'].value = 0
  form.elements['code'].value = ''
  form.elements['stock'].value = 0
  form.elements['status'].value = true
  form.elements['category'].value = ''
})
