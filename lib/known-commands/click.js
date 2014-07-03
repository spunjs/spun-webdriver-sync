'use strict';

var sutil = require('spun-util');
var regex = sutil.regex;
var errors = sutil.errors;
var f = require('util').format;

module.exports = function click(params, line){
  params = params.trim();
  if(!regex.string.test(params)) throw new errors.ExpectedStringError(params, line);

  return f('driver.findElement(By.cssSelector(%s)).click();', params);
};
