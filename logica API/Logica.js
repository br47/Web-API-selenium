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
  // empresa: Texto
  // -->
  // buscarEnGoogle ()
  // -->
  // json { VAT: Texto, Dirección: Texto}
  // .................................................................
  async buscarInfoEmpresa(empresa){
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    var vat = ""
    var direccion = ""
    await driver.get('https://www.companyweb.be/en')
    await driver.findElement(By.css('.btn-lg')).click();
    await driver.findElement(By.css('.search-input')).sendKeys(empresa);
    await driver.findElement(By.xpath('//*[@id="freeSearch"]/div[2]/span/button')).click();
    await driver.findElement(By.xpath("//td/a")).click()
    await driver.findElement(By.xpath('//*[@id="company-description"]/div/div/div/div[2]/div[1]/div[1]/div[2]/div/span')).getText().then(function(txt){
      vat = txt
    });;
    await driver.findElement(By.xpath('//*[@id="address"]')).getText().then(function(txt){
      direccion = txt
    });

    var res = {
      vat: vat,
      direccion: direccion
    }

    return res
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
