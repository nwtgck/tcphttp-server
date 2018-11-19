# tcphttp-server
[![npm](https://img.shields.io/npm/v/tcphttp-server.svg)](https://www.npmjs.com/package/tcphttp-server) [![Build Status](https://travis-ci.com/nwtgck/tcphttp-server.svg?token=TuxNpqznwwyy7hyJwBVm&branch=develop)](https://travis-ci.com/nwtgck/tcphttp-server)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

TCP over HTTP server

## Usage

Here is an example to request to example.com.  
Note that `X-Host` and `X-Port` headers. These headers are special for tcphttp-server.

```bash
curl -H "X-Host: example.com" -H "X-Port: 80" --data-binary @- https://tcphttp.glitch.me/ <<EOS
GET / HTTP/1.1
Host: example.com
Connection: close


EOS
```


Here is an example to use HTTPS.  
Note that `X-TLS` header. The header is special for tcphttp-server.

```bash
curl -H "X-Host: example.com" -H "X-Port: 443" -H "X-TLS: true" --data-binary @- https://tcphttp.glitch.me/ <<EOS
GET / HTTP/1.1
Host: example.com
Connection: close


EOS
```
