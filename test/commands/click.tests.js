'use strict';

var should = require('should');
var errors = require('../../lib/errors');

describe('click command', function(){
  var click = require('../../lib/commands/click');

  it('should throw an error if not given a string param', function(){
    should(function(){
      click('    fooey', {number: 45});
    }).throw(errors.ExpectedStringError);
  });

  it('should return a statement', function(){
    click('  "asdf"')
    .should
    .eql('driver.findElement(By.cssSelector("asdf")).click();');
  });
});
