# sidproxy

[![Build Status](https://travis-ci.org/qrb/sidproxy.svg?branch=master)](https://travis-ci.org/qrb/sidproxy)

> Simple Development Proxy and Http console

## Getting Started

### 1. Installation

``` bash
npm install sidproxy
```

### 2. Examples

``` javascript

// As Connect Middleware
var middleware = function (connect) {
    return [
        require('sidproxy')(true)
            .resolveProxy([
                {
                    name: 'Server 1',
                    path: 'client/api/path/server1/',
                    host: 'http://server1/'
                },
                {
                    name: 'Server 2',
                    path: 'client/api/path/server2/',
                    host: 'http://server2/'
                }
            ]),
        connect.static(require('path').resolve('.'))
    ];
}

```
