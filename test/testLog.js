var log = require('../lib/log'),
  colors = require('colors');

module.exports.testFormatTime = function(test) {
  test.equals(log.formatTime(1), "1.0000s".red.bold, "the log time was not correct");
  test.equals(log.formatTime(0.5), "0.5000s".yellow.bold, "the log time was not correct");
  test.equals(log.formatTime(0.1), "0.1000s".green.bold, "the log time was not correct");
  test.done();
}
