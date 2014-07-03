'use strict';

var allowedAssignments = [
  'location'
];
var f = require('util').format;
var sutil = require('spun-util');
var regex = sutil.regex;
var errors = sutil.errors;
var url = require('url');

module.exports = function set(params, line, context){
  params = params.trim();

  if(!regex.assignment.test(params)) throw new errors
    .ExpectedAssignmentError(params, line);
  var location;
  var assignment = regex.assignment.exec(params);
  var name = assignment[1];
  var value = assignment[2];

  if(allowedAssignments.indexOf(name) === -1) throw new errors
    .UnknownAssignmentError(name, value, line);

  switch(name){
  case 'location':
    location = url.parse(url.resolve(context.location || '', value));
    if(!location.hostname) throw new errors.InvalidUrlError(location, line);
    context.location = url.format(location);
    break;
  }
  return '';
};
