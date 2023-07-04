const express = require("express");
const { ProductManager } = require("./desafio_2_Castellano_Facundo");
const fs = require("fs");
const path = require("path");

const misProductos = new ProductManager(path.join(__dirname, "productos.json"));

//creo el servidor
const app = express();

//middelwares
app.use(express.urlencoded({ extended: true })); //este mi le permite al servidor usar datos complejos q viajen desde la url y mappearlos correctamente en el req.query

//rutas GET
app.get("/", (req, res) => {
  res.send(
    "Desafio 3, debe ir a una URL '/products/?limit=2' o '/products/:pid'"
  );
});

//ruta 1
app.get("/products", (req, res) => {
  const limit = req.query.limit;
  // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
  if (isNaN(limit) && limit !== undefined) {
    res.send(
      "Error en el valor de limit\nEl valor de limit, debe poder parsearse a tipo Number."
    );
  }
  if (!limit) {
    res.send(JSON.stringify(misProductos.getProducts()));
  }
  const productsToshow = misProductos.getProducts().slice(0, limit);

  res.send(JSON.stringify(productsToshow));
});

//ruta 2
app.get("/products/:pid", (req, res) => {
  const id = req.params.pid;
  // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
  if (isNaN(id)) {
    res.send(
      "Error en el valor del parametro pid\nEl valor del parametro pid debe poder parsearse a tipo Number."
    );
  }
  let product;
  try {
    product = misProductos.getProductById(+id);
  } catch {
    product = "Product Not Found";
  }

  res.send(JSON.stringify(product));
});

//levanto el servidor
app.listen(8080, () => {
  console.log("servidor iniciado en puerto 8080");
});
