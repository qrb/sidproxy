var Proxy = require('./lib/proxy'),
    log = require('./lib/log');

function Server(verbose) {
    if (verbose == undefined) {
        verbose = true;
    }

    this.logging = verbose;
    this.paths = [];
}

Server.prototype.resolveProxy = function(items) {
    for (var i = 0; i < items.length; i++) {
        this.paths.push(new Proxy(items[i].path.replace(/^\.{2}/, ''), items[i].host, items[i].name));
    }

    return this.handle.bind(this);
};

Server.prototype.handle = function(req, res, next) {
    var _proxy = false;

    for(var i = 0; i < this.paths.length; i++ ) {
        if (this.paths[i].shouldHandle(req.url)) {
            _proxy = this.paths[i];
        }
    }

    if (!_proxy) {
        return next();
    }

    if (this.logging) {
        _proxy.pipe(req, res, log.httpProxy.bind(log));
    } else {
        _proxy.pipe(req, res);
    }

};

module.exports = function(verbose) {
    return new Server(verbose);
};
