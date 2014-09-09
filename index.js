/**
 * Module Dependencies
 */

var Emitter = require('emitter');
var raf = require('raf');
var Now = require('now');

/**
 * Export `ticker`
 */

module.exports = ticker;

/**
 * Initialize ticker
 *
 * @param {Number} rate
 * @param {Number} limit
 * @return {Emitter}
 */

function ticker(rate, limit) {
  limit = arguments.length > 1 ? +limit + 1 : 2;

  var fps = 1000 / (rate || 60);
  var emitter = Emitter({});
  var last = Now();
  var time = 0;

  function loop() {
    raf(loop);

    var now = Now();
    var dt = now - last;
    var n = limit;

    time += dt;

    while (time > fps && n) {
      time -= fps;
      n -= 1;
      emitter.emit('tick', fps);
    }

    time = (time + fps * 1000) % fps;
    if (n !== limit) emitter.emit('draw', time / fps);
    last = now;
  }

  loop();

  return emitter;
}
