se creo la ruta "http://localhost:8080/test/logger" 
      es de acceso publico sin necesidad de estar logueado (no se le puso ninguna politica)
      la cree asi en ves de testLogger para que me quede mas prolijo y escalable el codigo.

el modo production o development se manda por CLI. 
se puede ver en el package.json, en los scripts como se esta ejecutando los modos "npm start" y "npm run dev", 

      "start": "node server.js",  --> el valor por defecto de (-env) es 'producction'
      "dev": "nodemon server.js -m mongo -env development",  --> se asigna el valor developmenta la variable (-env)

ademas se creo un modo de ejecucion "npm run devError" que entra y comete un error fatal, y se cierra el proceso con un error, En el archivo process.config.js entre las lineas 30 y 40, no se pq no funciona como deberia despues del await, para que llegue a escribir que se cerro el proceso, tuve q implementar un setTimeOut con un tiempo de espera mayor a 1000 ms pq sino no llegaa a escribir en el archivo.


