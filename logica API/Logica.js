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
