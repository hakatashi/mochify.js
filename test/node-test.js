/*global describe, it*/
/*
 * mochify.js
 *
 * Copyright (c) 2014 Maximilian Antoni <mail@maxantoni.de>
 *
 * @license MIT
 */
'use strict';

var assert = require('assert');
var run    = require('./fixture/run');


describe('node', function () {

  it('passes', function (done) {
    run('passes', ['--node', '-R', 'tap'], function (code, stdout) {
      assert.equal(stdout, '1..1\n'
        + 'ok 1 test passes\n'
        + '# tests 1\n'
        + '# pass 1\n'
        + '# fail 0\n');
      assert.equal(code, 0);
      done();
    });
  });

  it('fails', function (done) {
    run('fails', ['--node', '-R', 'tap'], function (code, stdout) {
      assert.equal(stdout.indexOf('1..1\n'
        + 'not ok 1 test fails\n'
        + '  Error: Oh noes!'), 0);
      assert.equal(code, 1);
      done();
    });
  });

  it('coverage', function (done) {
    run('passes', ['--node', '--cover', '-R', 'tap'], function (code, stdout) {
      assert.equal(stdout, '1..1\n'
        + 'ok 1 test passes\n'
        + '# tests 1\n'
        + '# pass 1\n'
        + '# fail 0\n\n# coverage: 29/29 (100.00 %)\n\n');
      assert.equal(code, 0);
      done();
    });
  });

  it('fails if test fails but coverage is fine', function (done) {
    run('fails', ['--node', '--cover', '-R', 'tap'], function (code) {
      assert.equal(code, 1);
      done();
    });
  });

  it('fails cover', function (done) {
    run('fails-cover', ['--node', '--cover', '-R', 'tap'],
      function (code, stdout) {
        var testOut = '1..1\n'
          + 'ok 1 test does not cover\n'
          + '# tests 1\n'
          + '# pass 1\n'
          + '# fail 0\n';
        var coverOut = '\n# coverage: 30/31 (96.77 %)\n\n';
        assert.equal(stdout.substring(0, testOut.length), testOut);
        assert.equal(stdout.substring(stdout.length - coverOut.length),
            coverOut);
        assert.equal(code, 1);
        done();
      });
  });

});
