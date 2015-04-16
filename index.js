var proxy = require('./lib/proxy'),
    log = require('./lib/log');

function Server(logging) {
    if (logging == undefined) {
        logging = true;
    }

    this.logging = logging;
    this.proxy = proxy;
}

Server.prototype.resolveProxy = function(path, host) {
    this.proxy.resolve(path, host);
    return this.handle.bind(this);
};

Server.prototype.handle = function(req, res, next) {

    if (!this.proxy.shouldHandle(req.url)) {
        return next();
    }

    if (this.logging) {
        this.proxy.pipe(req, res, log.httpProxy.bind(log));
    } else {
        this.proxy.pipe(req, res);
    }
};

module.exports = function(logging) {
    return new Server(logging);
};
