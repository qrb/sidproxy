var request = require('request'),
    Timer = require('./timer');

function Proxy(path, host) {
    this.resolve(path, host);
}

Proxy.prototype.resolve = function(path, host) {
    this._pathRegExp = new RegExp(path);
    this._host = host;
};

Proxy.prototype.shouldHandle = function(url) {
    return url.match(this._pathRegExp)
};

Proxy.prototype.transformUrl = function(url) {
    return this._host + url.replace(this._pathRegExp, '');
};

Proxy.prototype.pipe = function(req, res, logCallback) {
    var timer = new Timer(),
        reqBody = '';

    req.on("data", function(chunk){
        reqBody += chunk.toString();
    });

    var proxyReq = request({url: this.transformUrl(req.url), jar: true}, function (error, response, body) {
        if (logCallback) {
            logCallback(reqBody, response, body, timer);
        }
    });

    req.pipe(proxyReq);
    proxyReq.pipe(res);
};

module.exports = new Proxy();
