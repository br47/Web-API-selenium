// .....................................................................
// Logica.js
// .....................................................................
const sqlite3 = require("sqlite3")

//Cargamos el selenium-webdriver
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
  // buscarInfoEmpresa ()
  // -->
  // json { VAT: Texto, Dirección: Texto}
  // .................................................................
  async buscarInfoEmpresa(empresa){
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    //Asignamos valor vacío a las variables de respuesta
    var vat = ""
    var direccion = ""
    await driver.get('https://www.companyweb.be/en')
    await driver.findElement(By.css('.btn-lg')).click();
    await driver.findElement(By.css('.search-input')).sendKeys(empresa);
    await driver.findElement(By.xpath('//*[@id="freeSearch"]/div[2]/span/button')).click();
    await driver.findElement(By.xpath("//td/a")).click()
    //Asignamos valor deseadoa las variables de respuesta
    await driver.findElement(By.xpath('//*[@id="company-description"]/div/div/div/div[2]/div[1]/div[1]/div[2]/div/span')).getText().then(function(txt){
      vat = txt
    });;
    await driver.findElement(By.xpath('//*[@id="address"]')).getText().then(function(txt){
      direccion = txt
    });

    //Creamos estructura de respuesta con las variables deseadas
    var res = {
      vat: vat,
      direccion: direccion
    }

    return res
  } // ()

  // .................................................................
  //
  // -->
  // compararPrecios ()
  // -->
  // vat: texto
  // .................................................................
  async ranking(){
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    var empresa = ""
    var vat = ""
    await driver.get("https://ranking-empresas.eleconomista.es/")
    await driver.findElement(By.css("#didomi-notice-agree-button > span")).click()
    await driver.findElement(By.css(".tr_hover_even:nth-child(1) > .tal")).click()
    await driver.findElement(By.css(".tit1")).getText().then(function(txt){
      empresa = txt
    });;
    await driver.switchTo().newWindow('tab');
    await driver.get('https://www.companyweb.be/en')
    await driver.findElement(By.css('.btn-lg')).click();
    await driver.findElement(By.css('.search-input')).sendKeys(empresa);
    await driver.findElement(By.xpath('//*[@id="freeSearch"]/div[2]/span/button')).click();
    await driver.findElement(By.xpath("//td/a")).click()
    //Asignamos valor deseadoa las variables de respuesta
    await driver.findElement(By.xpath('/html/body/main/section[1]/div/div/div/div[2]/div[1]/div[1]/div[2]/div/span')).getText().then(function(txt){
      vat = txt
    });;

    //Creamos estructura de respuesta con las variables deseadas
    var res = {
      nombre: empresa,
      vat: vat
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
