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
      {command: 'get', args: {url: 'http://google.com'}},
      {command: 'find', args: {query: '[name=q]'}},
      {command: 'type', args: {text: 'where are the dinosaurs?'}},
      {command: 'submit', args: {}},
      {command: 'submit', args: {query: '[name=q]'}},
      {command: 'refresh', args: {}},
      {command: 'click', args: {query: '.q.qs'}},
      {command: 'sleep', args: {amount: 5}},
      {command: 'find', args: {query: '[name=q]'}},
      {command: 'click', args: {}},
      {command: 'close', args: {}},
      {command: 'quit', args: {}}
    ];
    var provider = new Provider();
    lines.forEach(function(line){
      provider[line.command](line.args, line, {lines: lines});
    });
    safeEval(provider.toString());
  });
});
