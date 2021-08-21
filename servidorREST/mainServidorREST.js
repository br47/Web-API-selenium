// .....................................................................
// mainServidorREST.js
// .....................................................................
// .....................................................................
// .....................................................................
const express = require('express')
const bodyParser = require('body-parser')
const Logica = require("../logica API/Logica.js")
// .....................................................................
// .....................................................................
function cargarLogica(fichero) {
  return new Promise((resolver, rechazar) => {
    var laLogica = new Logica(fichero,
      function(err) {
        if (err) {
          rechazar(err)
        } else {
          resolver(laLogica)
        }
      }) // new
  }) // Promise
} // ()
// .....................................................................
// main()
// .....................................................................
async function main() {
  var laLogica = await cargarLogica("../base de datos/datos.bd")
  // creamos el servidor
  var servidorExpress = express()
  // para poder acceder a la carga de la petición http
  // asumiendo que es JSON
  servidorExpress.use(bodyParser.text({
    type: 'application/json'
  }))
  // cargamos las reglas REST
  var reglas = require("./ReglasREST.js")
  reglas.cargar(servidorExpress, laLogica)
  // arrancamos el servidor
  var servicio = servidorExpress.listen(8080, function() {})
  console.log("servidor REST escuchando en el puerto 8080 ")
  // control-c para cerrar el servicio ordenadamente
  process.on('SIGINT', function() {
    console.log(" terminando ")
    servicio.close()
  })
} // ()
// .....................................................................
// .....................................................................
main()
// .....................................................................
// .....................................................................
