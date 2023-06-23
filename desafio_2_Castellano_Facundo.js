//Desafio 2  - Castellano Facundo.

const { clear } = require("console");
const fs = require("fs");
const { get } = require("https");
const path = require("path");
const { isArrayBuffer } = require("util/types");

class ProductManager {
  constructor(pathFile) {
    this.productsCode = [];
    this.products = [];
    this.currentId = 0;
    this.path = pathFile; // se debe poner de forma correcta y completa al momento de inicializar la clase.

    this.getSavedProducts = async function () {
      if (fs.existsSync(this.path)) {
        const allProductstFile = fs.readFileSync(this.path);
        this.products = JSON.parse(allProductstFile);
        this.products.forEach((product) => {
          this.productsCode.push(product.code);
        });
        this.currentId = this.products[this.products.length - 1].id;
      }
    };
    this.getSavedProducts();
  }

  async addProduct(ProductoNuevo) {
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
      //si lo creo lo guarod en el archivo
      if (!fs.existsSync(this.path)) {
        fs.writeFileSync(this.path, JSON.stringify(this.products));
      } else {
        const allProductstFile = fs.readFileSync(this.path);
        const allProductsAsArray = JSON.parse(allProductstFile);
        allProductsAsArray.push(productToAdd);
        fs.writeFileSync(this.path, JSON.stringify(allProductsAsArray));
      }
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

  showProductsCode() {
    console.log(this.productsCode);
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

  deleteProductByID(idProduct) {
    try {
      const productToDelete = this.getProductById(idProduct);
      const index = this.products.indexOf(productToDelete);
      this.products.splice(index, 1);
      fs.writeFileSync(this.path, JSON.stringify(this.products));
    } catch (err) {
      throw err;
    }
  }

  modifyProductById(idProduct, newProduct) {
    try {
      const oldProduct = this.getProductById(idProduct);
      const codeTodelete = oldProduct
      const { title, description, price, thumbnail, code, stock } = newProduct;
      const productUpdated = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      if (!Object.values(productUpdated).includes(undefined)) {
        console.log("entre al IF");
        this.productsCode.splice(this.productsCode.indexOf(codeTodelete),1,code); //--> modifico el code de productsCode
        productUpdated.id = oldProduct.id; //--> mantengo el Id que es generado automaticamente
        this.products.splice(this.products.indexOf(oldProduct),1,productUpdated);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
      } else {
        throw new Error("Productos con los parametros mal definidos");
      }
    } catch (err) {
      throw err;
    }
  }
}

//TEST DE FUNCIONAMIENTO https://github.com/FacuCastellano/coderBackendDesafiosCastellanoFacundo.git

const miVineria = new ProductManager(path.join(__dirname, "prueba.json"));
miVineria.showProductsCode();
//miTienda.deleteProductByID(13)
//console.log(miVineria.getProductById(5))

//setTimeout(()=>{console.log(miTienda2.getProducts())},2000)
//console.log(miTienda2.getProducts());

const productModified = {
  title: "Vino El bolson",
  description: "Este vino lo toma bilbo",
  price: 875,
  thumbnail: "aca va una imagen de la comarca",
  code: "facundin2",
  stock: 1,
};

miVineria.modifyProductById(1, productModified);
//console.log(miVineria.getProductById(5))
// {
//   "title": "otro producto prueba",
//   "description": "Este es el 2do producto prueba",
//   "price": 653,
//   "thumbnail": "tampoco tiene imagen",
//   "code": "xyz987",
//   "stock": 30,
//   "id": 2
// }

// miTienda.addProduct({
//   title: "otro producto prueba",
//   description: "Este es el 2do producto prueba",
//   price: 653,
//   thumbnail: "tampoco tiene imagen",
//   code: "xyz987",
//   stock: 30,
// });

// miTienda.addProduct({
//   title: "tercer producto",
//   description: "Este es el 3do producto prueba",
//   price: 369,
//   thumbnail: "Uno mas sin imagen",
//   code: "000123-dsawss",
//   stock: 30,
// });

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
// const miProductoBuscado = miTienda.getProductById(1);
//console.log(miProductoBuscado);
// const miProductoBuscado2 = miTienda.getProductById(12);
// console.log(miProductoBuscado2);

// descomentar las siguientes lineas para checkear el error por buscar un producto de Id inexistente.
//const miProductoBuscado4 = miTienda.getProductById(123) //tira error que el producto con dicho Id no existe
// const miProductoBuscado3 = miTienda.getProductById("1") // tira error porque el metodo usa el operador de igualdad estrica y los Id son number.
