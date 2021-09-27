const webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

async function obtenerDescuento(){

  var driver = new webdriver.Builder().forBrowser('chrome').build();
  await driver.get('https://tempmail.ninja/')
  var tab1  = driver.getWindowHandle()
  var correo = await driver.findElement(By.id("emailtemporal")).getAttribute("value")
  await driver.switchTo().newWindow('tab');
  await driver.get('https://www.zalando.es/')
  await driver.findElement(By.linkText("-10% si te suscribes a nuestra Newsletter")).click()
  await driver.findElement(By.id("email-input")).sendKeys(correo)
  await driver.findElement(By.css(".fZFtK3:nth-child(2) .Vm2aBa")).click()
  await driver.findElement(By.css(".JIgPn9")).click()
  await driver.close();
  await driver.switchTo().window(tab1);
  await driver.sleep(12000)
  await driver.findElement(By.css(".acciones:nth-child(4) > .open-message")).click()

} // ()

async function ranking(){

  var driver = new webdriver.Builder().forBrowser('chrome').build();
  var empresa = ""
  await driver.get("https://ranking-empresas.eleconomista.es/")
  await driver.findElement(By.css("#didomi-notice-agree-button > span")).click()
  await driver.findElement(By.css(".tr_hover_even:nth-child(1) > .tal")).click()
  await driver.findElement(By.css(".tit1")).getText().then(function(txt){
    empresa = txt
    console.log(empresa);
  });;
  return empresa

} // ()

/*var a = ""

const { exec } = require("child_process");

a = exec("selenium-side-runner /Users/bri/Desktop/test.side", (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
console.log(a);*/
