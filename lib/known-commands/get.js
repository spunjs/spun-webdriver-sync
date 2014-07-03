'use strict';

var f = require('util').format;
var sutil = require('spun-util');
var regex = sutil.regex;
var errors = sutil.errors;
var url = require('url');

module.exports = function get(params, line, context){
  params = params.trim();
  if(
    !regex.string.test(params)
    && !context.location
  )throw new errors.ExpectedStringError(params, line);
  var location = url.parse(
    url.resolve(
      context.location || '',
      params.replace(regex.stringQuotes, '')
    )
  );

  if(!location.hostname) throw new errors.InvalidGetRequestError(
    location,
    line
  );

  location = context.location = url.format(location);

  return f('driver.get("%s");', location);
};
