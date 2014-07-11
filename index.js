'use strict';

module.exports = Provider;

var composites = require('composites');
var f = require('util').format;
var Program = composites.Program;

function Provider(argv){
  var program = new Program();

  program
    .push('var driverMap = {')
    .push(' chrome:  "ChromeDriver",')
    .push(' ff:      "FirefoxDriver",')
    .push(' ie:      "InternetExplorerDriver",')
    .push(' opera:   "OperaDriver",')
    .push(' phantom: "PhantomJSDriver",')
    .push(' safari:  "SafariDriver"')
    .push('};')
    .push('var wd = require("webdriver-sync");')
    .push('var By = wd.By;')
    .push('var Driver = wd[driverMap[process.env.BROWSER]];')
    .push('var driver = new Driver();')
    .push('var lastElement;')
    .push('process.on("uncaughtException", function(err){driver.quit();throw err;});');

  this.click = function(line, lines){
    if(line.args)
      program.push(f('driver.findElement(By.cssSelector(%s)).click();', line.args));
    else
      program.push('lastElement.click();');
  };

  this.close = function(line, lines){
    program.push('driver.close();');
  };

  this.find = function(line, lines){
    program.push('lastElement = driver.findElement(By.cssSelector(', line.args, '));');
  };

  this.get = function(line, lines){
    program.push('driver.get(', line.args, ');');
  };

  this.quit = function(line, lines){
    program.push('driver.quit();');
  };

  this.refresh = function(line, lines){
    program.push('driver.navigate().refresh();');
  };

  this.sleep = function(line, lines){
    program.push('wd.sleep(', parseInt(line.args) * 1000, ');');
  };

  this.submit = function(line, lines){
    if(line.args)
      program.push(f('driver.findElement(By.cssSelector(%s)).submit();', line.args));
    else
      program.push('lastElement.submit();');
  };

  this.type = function(line, lines){
    program.push('lastElement.sendKeys(', line.args, ');');
  };

  this.toString = program.join;
}
