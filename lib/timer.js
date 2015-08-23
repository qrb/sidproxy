function Timer() {
  this.start = process.hrtime();
  this.time = this.start;
}

Timer.prototype.stop = function() {
  this.time = process.hrtime(this.start);
  return this;
};

Timer.prototype.toNanoseconds = function() {
  return this.time[0] * 1e9 + this.time[1];
}

Timer.prototype.toSeconds = function() {
  return this.toNanoseconds() * 1.0e-9;
};

Timer.prototype.toMilliseconds = function() {
  return this.toNanoseconds() * 1e-6;
};

module.exports = Timer;
