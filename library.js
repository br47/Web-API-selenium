var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

  var driver = new webdriver.Builder().forBrowser('chrome').build();

  driver.get('https://www.companyweb.be/en')
  driver.findElement(By.css('.btn-lg')).click();
  driver.findElement(By.css('.search-input')).sendKeys('Auraportal');
  driver.findElement(By.xpath('//*[@id="freeSearch"]/div[2]/span/button')).click();
  //driver.wait(until.elementLocated(By.xpath('/html/body/main/section/div/div/div/div/div/table/tbody/tr/td[1]/a')), 10000);

  setTimeout(function() {
    driver.findElement(By.xpath("//td/a")).click()
    setTimeout(function() {
      var vat = ""
      driver.findElement(By.xpath('//*[@id="company-description"]/div/div/div/div[2]/div[1]/div[1]/div[2]/div/span')).getText().then(function(txt){
        vat = txt
        console.log(vat);
      });;
      var direccion = ""
      driver.findElement(By.xpath('//*[@id="address"]')).getText().then(function(txt){
        direccion = txt
        console.log(direccion);
      });
      setTimeout(function() {
        console.log("fuera "+vat+" "+direccion);
      }, 10000);
    }, 10000)

  }, 10000);



  //driver.get('https://www.companyweb.be/company-information/auraportal-benelux-bv/divers/818993269')
  //driver.findElement(By.css('.btn-lg')).click();
