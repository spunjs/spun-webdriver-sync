'use strict';

module.exports = Provider;

var composites = require('composites');
var Program = composites.Program;

function Provider(argv){
  var program = new Program();

  program
    .push('var driverMap = {')
    .push(' chrome: "ChromeDriver",')
    .push(' ff: "FirefoxDriver",')
    .push(' ie: "InternetExplorerDriver",')
    .push(' opera: "OperaDriver",')
    .push(' phantom: "PhantomJSDriver",')
    .push(' safari: "SafariDriver"')
    .push('};')
    .push('var wd = require("webdriver-sync");')
    .push('var By = wd.By;')
    .push('var Driver = wd[driverMap[process.env.BROWSER]];')
    .push('var driver = new Driver();')
    .push('process.on("uncaughtException", function(err){driver.quit();throw err;});');

  this.get = function(line, lines){
    program.push('driver.get(', line.args, ');');
  };

  this.click = function(line, lines){
    program.push('driver.findElement(By.cssSelector(', line.args, ')).click();');
  };

  this.close = function(line, lines){
    program.push('driver.close();');
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

  this.toString = program.join;
}
