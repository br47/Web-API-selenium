// .....................................................................
// ReglasREST.js
// .....................................................................
module.exports.cargar = function(servidorExpress, laLogica) {

  // .......................................................
  // GET /prueba
  // .......................................................
  servidorExpress.get('/prueba/', function(peticion, respuesta) {
    console.log(" * GET /prueba ")
    respuesta.send("¡Funciona!")
  }) // get /prueba

  // .......................................................
  // GET /marca
  // .......................................................
  servidorExpress.get('/marca/', function(peticion, respuesta) {
    console.log(" * GET /marca ")
    laLogica.abrirMarca()
    respuesta.send("¡Abierta la web de marca con éxito!")
  }) // get /marca

  // .......................................................
  // POST /abrirWeb
  // .......................................................
  servidorExpress.post('/abrirWeb/', async function(peticion, respuesta) {
    console.log(" * POST /abrirWeb ")
    var datos = JSON.parse(peticion.body)
    await laLogica.abrirPaginaWeb(datos.pagina)
    respuesta.send("¡Abierta la web con éxito!")
  }) // post /abrirWeb

  // .......................................................
  // POST /buscar
  // .......................................................
  servidorExpress.post('/buscar/', async function(peticion, respuesta) {
    console.log(" * POST /buscar ")
    var datos = JSON.parse(peticion.body)
    await laLogica.buscarEnGoogle(datos.busqueda)
    respuesta.send("¡Búsqueda realizada con éxito!")
  }) // post /buscar

  // .......................................................
  // POST /infoEmpresa
  // .......................................................
  servidorExpress.post('/infoEmpresa/', async function(peticion, respuesta) {
    console.log(" * POST /infoEmpresa ")
    var datos = JSON.parse(peticion.body);
    var res = await laLogica.buscarInfoEmpresa(datos.empresa);
    respuesta.send(JSON.stringify(res));
  }) // post /infoEmpresa

} // cargar()
// .....................................................................
// .....................................................................
