// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")

const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;
// .....................................................................
// .....................................................................
module.exports = class Logica {

  // .................................................................
  // nombreBD: Texto
  // -->
  // constructor ()
  // -->
  //
  // .................................................................
  constructor(nombreBD, cb) {
    this.laConexion = new sqlite3.Database(nombreBD,
      (err) => {
        if (!err) {
          this.laConexion.run("PRAGMA foreign_keys=ON")
        }
        cb(err)
      })
  } // ()

  // .................................................................
  //
  // -->
  // abrirMarca ()
  // -->
  //
  // .................................................................
  abrirMarca(){
    var driver = new webdriver.Builder().forBrowser('chrome').build();

    driver.get('https://www.marca.com/')
  } // ()

  // .................................................................
  // URL: Texto
  // -->
  // abrirPaginaWeb ()
  // -->
  //
  // .................................................................
  abrirPaginaWeb(pagina){
    var driver = new webdriver.Builder().forBrowser('chrome').build();

    driver.get(pagina)
  } // ()

  // .................................................................
  // busqueda: Texto
  // -->
  // buscarEnGoogle ()
  // -->
  //
  // .................................................................
  buscarEnGoogle(busqueda){
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    driver.get('https://www.google.es/')

    driver.findElement(By.id('L2AGLb')).click();
    driver.findElement(By.css('input')).sendKeys(busqueda);
    driver.findElement(By.xpath('/html/body/div[1]/div[3]/form/div[1]/div[1]/div[3]/center/input[1]')).click();
  } // ()

  // .................................................................
  //          cerrar() -->
  // .................................................................
  cerrar() {
    return new Promise((resolver, rechazar) => {
      this.laConexion.close((err) => {
        (err ? rechazar(err) : resolver())
      })
    })
  } // ()
} // class
// .....................................................................
// .....................................................................
