# tcphttp-server
[![npm](https://img.shields.io/npm/v/tcphttp-server.svg)](https://www.npmjs.com/package/tcphttp-server) [![Build Status](https://travis-ci.com/nwtgck/tcphttp-server.svg?token=TuxNpqznwwyy7hyJwBVm&branch=develop)](https://travis-ci.com/nwtgck/tcphttp-server)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

TCP over HTTP server

## Usage

Here is an example to request to example.com.
```bash
curl -H "X-HOST: example.com" -H "X-PORT: 80" --data-binary @- https://tcphttp.glitch.me/ <<EOS
GET / HTTP/1.1
Host: example.com
Connection: close


EOS
```