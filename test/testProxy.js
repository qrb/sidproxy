var Proxy = require('../lib/proxy'),
  proxy;

module.exports.setUp = function(callback) {
  proxy = new Proxy('client/path/', 'http://localhost/server1/', 'Proxy 1');
  callback();
}

module.exports.testProxyShouldHandleRequestedUrl = function(test) {
  test.ok(proxy.shouldHandle('client/path/verb/resource'), 'should handle the requested url');
  test.ok(!proxy.shouldHandle('alternative/path/verb/resource'), 'should not handle the requested url');
  test.done();
}

module.exports.testProxyTransformUrl = function(test) {
  test.equals(proxy.transformUrl('client/path/verb/resource'), 'http://localhost/server1/verb/resource',
    'should transform the requested url');
  test.done();
}

