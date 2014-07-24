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

  this.click = function(args, line, spec){
    if(args.query)
      program.push(f('driver.findElement(By.cssSelector("%s")).click();', args.query));
    else
      program.push('lastElement.click();');
  };

  this.close = function(args, line, spec){
    program.push('driver.close();');
  };

  this.find = function(args, line, spec){
    program.push(f('lastElement = driver.findElement(By.cssSelector("%s"));', args.query));
  };

  this.get = function(args, line, spec){
    program.push(f('driver.get("%s");', args.url));
  };

  this.quit = function(args, line, spec){
    program.push('driver.quit();');
  };

  this.refresh = function(args, line, spec){
    program.push('driver.navigate().refresh();');
  };

  this.sleep = function(args, line, spec){
    program.push(f('wd.sleep(%s);', args.amount * 1000));
  };

  this.submit = function(args, line, spec){
    if(args.query)
      program.push(f('driver.findElement(By.cssSelector("%s")).submit();', args.query));
    else
      program.push('lastElement.submit();');
  };

  this.type = function(args, line, spec){
    if(args.query)
      program.push(f('driver.findElement(By.cssSelector("%s")).sendKeys("%s");', args.query, args.text));
    else
      program.push(f('lastElement.sendKeys("%s");', args.text));
  };

  this.toString = program.join;
}
