# tcphttp-server
[![npm](https://img.shields.io/npm/v/tcphttp-server.svg)](https://www.npmjs.com/package/tcphttp-server) [![Build Status](https://travis-ci.com/nwtgck/tcphttp-server.svg?token=TuxNpqznwwyy7hyJwBVm&branch=develop)](https://travis-ci.com/nwtgck/tcphttp-server)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

TCP over HTTP server

## Quick Start

Here is examples to show how to use TCP over HTTP. Actually, the following examples show "HTTP over HTTPS" and "HTTPS over HTTPS".  

Here is an example to request to example.com.

```bash
curl --data-binary @- 'https://tcphttp.glitch.me?host=example.com&port=80' <<EOS
GET / HTTP/1.1
Host: example.com
Connection: close


EOS
```


Here is an example to use HTTPS.

```bash
curl --data-binary @- 'https://tcphttp.glitch.me?host=example.com&port=443&tls' <<EOS
GET / HTTP/1.1
Host: example.com
Connection: close


EOS
```

## Connection Flow

```
You ==HTTP Request => [tcphttp-server] ==TCP=> example.com:80
You <=HTTP Response== [tcphttp-server] <=TCP== example.com:80
```
