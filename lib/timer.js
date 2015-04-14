function Timer() {
    this.start = process.hrtime();
    this.time = this.start;
}

Timer.prototype.stop = function() {
    this.time = process.hrtime(this.start);
    return this;
};

Timer.prototype.toSeconds = function() {
    return (this.time[0] * 1000000000 + this.time[1]) / 1000000000;
};

Timer.prototype.toMilliseconds = function() {
    return (this.time[0] * 1000000 + this.time[1]) / 1000000;
};


module.exports = Timer;
