'use strict';

var should = require('should');
var errors = require('../../lib/errors');

describe('get command', function(){
  var get = require('../../lib/commands/get');
  var errors = require('../../lib/errors');

  it('should throw error if not given a string param and no location in context', function(){
    should(function(){
      get(' asdf', {}, {});
    }).throw(errors.ExpectedStringError);
  });

  it('should throw error if not given a valid url', function(){
    should(function(){
      get(' "../foo"', {}, {});
    }).throw(errors.InvalidGetRequestError);
  });

  it('should create a get command and set the location in the context', function(){
    var context = {};
    get(' "http://google.com"', {}, context)
    .should
    .eql('driver.get("http://google.com/");');
    context.location.should.equal('http://google.com/');
  });

  it('should use context location', function(){
    var context = {location: 'http://scribble.com/lunch/'};
    get('', {}, context)
    .should
    .eql('driver.get("http://scribble.com/lunch/");');
    context.location.should.eql('http://scribble.com/lunch/');
  });
});
