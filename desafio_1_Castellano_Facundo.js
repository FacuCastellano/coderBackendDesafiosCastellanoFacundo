//Desafio 1  - Castellano Facundo.

class ProductManager {
  constructor() {
    this.productsCode = [];
    this.products = [];
    this.currentId = 0;
  }

  addProduct(ProductoNuevo) {
    const { title, description, price, thumbnail, code, stock } = ProductoNuevo;
    const productToAdd = { title, description, price, thumbnail, code, stock };

    if (
      !this.productsCode.includes(code) &&
      !Object.values(productToAdd).includes(undefined)
    ) {
      this.currentId += 1;
      productToAdd.id = this.currentId;
      this.productsCode.push(productToAdd.code);
      this.products.push(productToAdd);
    } else {
      if (this.productsCode.includes(code)) {
        throw new Error(
          "El campo code del producto que se intenta agregar, ya pertenece a otro producto"
        );
      } else {
        throw new Error("Productos con los parametros mal definidos");
      }
    }
  }

  getProducts() {
    return this.products;
  }

  // el metodo getProductById, retorna el producto (es decir no es que lo muestre por pantalla.
  getProductById(idFounded) {
    for (let product of this.products) {
      if (product.id === idFounded) {
        //decido usar el operador de comparacion estricto, por lo que se espera recibir un tipo Number, no un string.
        return product;
      }
    }
    throw new Error("Not found");
  }
}

//TEST DE FUNCIONAMIENTO

const miTienda = new ProductManager();

console.log(miTienda.getProducts());

miTienda.addProduct({
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "sin imagen",
  code: "abc123",
  stock: 25,
});

miTienda.addProduct({
  title: "otro producto prueba",
  description: "Este es el 2do producto prueba",
  price: 653,
  thumbnail: "tampoco tiene imagen",
  code: "xyz987",
  stock: 30,
});

// descomentar la siguiente linea para checkear el error por duplicidad de codigo en los productos.
// miTienda.addProduct({
//   title: "producto prueba",
//   description: "Este es un producto prueba",
//   price: 200,
//   thumbnail: "sin imagen",
//   code: "abc123",
//   stock: 25,
// });

// descomentar la siguiente linea para checkear el error por atributos de un producto incompleto, en este caso se omitio tiene el campo 'description'.
//miTienda.addProduct({title:"producto prueba",price:200,thumbnail:"sin imagen",code:"123456",stock:25})

//metodo para obtener un producto segun el Id.
const miProductoBuscado = miTienda.getProductById(1);
console.log(miProductoBuscado);
const miProductoBuscado2 = miTienda.getProductById(2);
console.log(miProductoBuscado2);

// descomentar las siguientes lineas para checkear el error por buscar un producto de Id inexistente.
//const miProductoBuscado4 = miTienda.getProductById(123) //tira error que el producto con dicho Id no existe
// const miProductoBuscado3 = miTienda.getProductById("1") // tira error porque el metodo usa el operador de igualdad estrica y los Id son number.
