var webdriver = require('selenium-webdriver'),
  By = webdriver.By,
  until = webdriver.until;

  var driver = new webdriver.Builder().forBrowser('chrome').build();
  driver.get('https://www.google.es/')

  driver.findElement(By.id('L2AGLb')).click();
  driver.findElement(By.css('input')).sendKeys('Auraquantic');
  driver.findElement(By.xpath('/html/body/div[1]/div[3]/form/div[1]/div[1]/div[3]/center/input[1]')).click();
