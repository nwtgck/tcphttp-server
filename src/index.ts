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
// TODO: Hard code
const serverPort: number = args["http-port"];

tcphttp.server.listen(serverPort, serverHost, ()=>{
  console.log(`Running on ${serverPort}...`);
});
