var Timer = require('./timer'),
    colors = require('colors');

function Log() {
    this.timerPrecision = 4;
    this.timerRange = [0.5, 1];
}

Log.prototype.formatTime = function(value){
    var color = colors.green;

    value = value.toFixed(this.timerPrecision);

    if (value >= this.timerRange[1]) {
        color = colors.red;
    } else if (value >= this.timerRange[0]) {
        color = colors.yellow;
    }

    return color(value + "s").bold;
};

Log.prototype.http = function(req, res) {
    var self = this,
        time = new Timer(),
        body = '';

    req.on('data', function(chunk) { body += chunk.toString(); });

    res.on('finish', function() {
        time.stop();
        console.log(
            (req.url.indexOf('http') === 0 ? "\uD83C\uDF0F\t" : "\uD83C\uDF31\t"),
            res.statusCode + "\t",
            req.method + "\t",
            self.formatTime(time.toSeconds()) + "\t",
            req.url.cyan,
            body.italic.gray
        );
    });
};

Log.prototype.httpProxy = function(reqBody, res, body, timer) {
    var self = this;

    timer.stop();
    console.log(
        (res.request.href.indexOf('http') === 0 ? "\uD83C\uDF0F\t" : "\uD83C\uDF31\t"),
        res.statusCode + "\t",
        res.request.method + "\t",
        self.formatTime(timer.toSeconds()) + "\t",
        res.request.href.cyan,
        reqBody? "\n\t\t\t\t\t REQUEST BODY:\t".cyan.dim : '',
        reqBody? reqBody.cyan.dim : ''
    );
};

module.exports = new Log();
