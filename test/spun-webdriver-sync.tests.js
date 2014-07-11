'use strict';

var safeEval = function(code){
  eval(code);
};
var fs = require('fs');
var read = fs.readFileSync;

describe('spun-webdriver-sync', function(){
  var Provider = require('..');

  process.env.BROWSER = 'ff';

  it('should work', function(){
    var lines = [
      {command: 'get', args: '"http://google.com"'},
      {command: 'find', args: '"[name=q]"'},
      {command: 'type', args: '"where are the dinosaurs?"'},
      {command: 'submit'},
      {command: 'refresh'},
      {command: 'click', args: '".q.qs"'},
      {command: 'sleep', args: '5'},
      {command: 'quit'}
    ];
    var provider = new Provider();
    lines.forEach(function(line){
      provider[line.command](line, lines);
    });
    safeEval(provider.toString());
  });
});
