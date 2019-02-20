# tcphttp-server
[![npm](https://img.shields.io/npm/v/tcphttp-server.svg)](https://www.npmjs.com/package/tcphttp-server) [![Build Status](https://travis-ci.com/nwtgck/tcphttp-server.svg?token=TuxNpqznwwyy7hyJwBVm&branch=develop)](https://travis-ci.com/nwtgck/tcphttp-server) 
[![Docker Automated build](https://img.shields.io/docker/automated/nwtgck/tcphttp-server.svg)](https://hub.docker.com/r/nwtgck/tcphttp-server/) [![](https://images.microbadger.com/badges/image/nwtgck/tcphttp-server.svg)](https://microbadger.com/images/nwtgck/tcphttp-server "Get your own image badge on microbadger.com")

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

## Run Server 

### Way 1: Run server on Heroku

Click the button below and run a server.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Way 2: Run server on Docker

Run a tcphttp-server on <http://localhost:8181> by the following command.

```bash
docker run -p 8181:8080 nwtgck/tcphttp-server
```

You can also specify options as follows. 

```bash
docker run -p 8181:80 nwtgck/tcphttp-server --http-port=80
```

### Way 3: Run server with npm

Install `tcphttp-server` as command as follows. 

```bash
npm install -g tcphttp-server
```

Then, run a server as follows.

```bash
tcphttp-server --http-port=8181
```

### Way 4: Run server from source 

Run a server from the latest source.

```bash
# Clone this repository
git clone https://github.com/nwtgck/tcphttp-server.git
# Go to the directory
cd tcphttp-server
# Install dependencies
npm install
# Run a server
npm start
```
