#!/usr/bin/env node
// (from: https://qiita.com/takayukioda/items/a149bc2907ef77121229)

import * as tcphttp from "./tcphttp";
import * as yargs from "yargs";

// Create option parser
const parser = yargs
  .option("http-port", {
    describe: 'Port of HTTP server',
    default: 8080
  });

// Parse arguments
const args = parser.parse(process.argv);

const serverHost: string = "0.0.0.0";
const serverPort: number = args["http-port"];

tcphttp.server.listen(serverPort, serverHost, ()=>{
  console.log(`Running on ${serverPort}...`);
});


// Not to down whole server
process.on('uncaughtException', function (err) {
  console.error('on uncaughtException: ', err);
});
