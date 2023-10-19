se creo la ruta "http://localhost:8080/api/products/mockingproducts" es de acceso sin necesidad de estar logueado (no se le puso ninguna politica)


se hicieron los errores custom y se los agarro con un middelware.. para probarlo se puede poner un id de un product/cart que no exista como el siguente:
ejemplos de erroes:


      http://localhost:8080/api/products/6514adasasd
      http://localhost:8080/api/carts/6514adasasd
