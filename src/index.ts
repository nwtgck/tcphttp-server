import * as tcphttp from "./tcphttp";

const serverHost: string = "0.0.0.0";
// TODO: Hard code
const serverPort: number = 8181;

tcphttp.server.listen(serverPort, serverHost, ()=>{
  console.log(`Running on ${serverPort}...`);
});
