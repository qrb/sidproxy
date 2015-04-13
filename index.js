var proxy = require('./lib/proxy'),
    log = require('./lib/log');

function Server() {
    this.proxy = proxy;
}

Server.prototype.resolveProxy = function(path, host) {
    this.proxy.resolve(path, host);
    return this.handle.bind(this);
};

Server.prototype.handle = function(req, res, next) {

    if (!this.proxy.shouldHandle(req.url)) {
        log.http(req, res);
        return next();
    }

    this.proxy.pipe(req, res, log.httpProxy.bind(log));
};

module.exports = new Server();