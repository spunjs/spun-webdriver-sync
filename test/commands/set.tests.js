'use strict';

var should = require('should');
var errors = require('../../lib/errors');

describe('set command', function(){
  var set = require('../../lib/commands/set');

  it('should throw an error if not given an assignment', function(){
    should(function(){
      set('    fooey', {number: 45});
    }).throw(errors.UnownAssignmentError);
  });

  it('should throw an error if given an unkown assignment', function(){
    should(function(){
      set('    fooey="5"', {number: 45});
    }).throw(errors.UnownAssignmentError);
  });

  it('should set location in the context', function(){
    var context = {};
    set('  location="http://google.com"', {}, context).should.eql('');
    context.location.should.eql('http://google.com/');
  });

  it('should resolve against context.location', function(){
    var context = {location: 'http://fred.com/news/2014/2/3?wow=yea'};
    set('  location="../../"', {}, context).should.eql('');
    context.location.should.eql('http://fred.com/news/');
  });

  it('should throw an error on bad hostname', function(){
    var context = {};
    should(function(){
      set('  location="http:///"', {}, context);
    }).throw(errors.InvalidUrlError);
  });
});
