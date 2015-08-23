var Timer = require('../lib/timer'),
  timer;

module.exports.testTimer = function(test) {
  timer = new Timer();
  setTimeout(function() {
    timer.stop();

    test.equals((timer.toNanoseconds() / 1e9).toFixed(1), 0.1, "the time was not accurate");
    test.equals((timer.toMilliseconds() / 1000).toFixed(1), 0.1, "the time was not accurate");
    test.equals(timer.toSeconds().toFixed(1), 0.1, "the time was not accurate");
    test.done();
  }, 100);
}
