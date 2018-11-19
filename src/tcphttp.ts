import * as net  from "net";
import * as tls  from "tls";
import * as http from "http";

/**
 * Convert bool string to boolean value
 * @param {string} boolStr
 * @returns {boolean}
 */
function boolStrToBool(boolStr: string | undefined): boolean {
  if (boolStr === undefined) {
    return false;
  } else {
    return boolStr.toLocaleLowerCase() === "true";
  }
}

export const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse)=>{
  const hostHeader = req.headers['x-host'];
  const portHeader = req.headers['x-port'];
  const tlsHeader  = req.headers['x-tls'];

  // Enable CORS
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, X-Host, X-Port, X-TLS"
  });

  if (typeof hostHeader === "string" && typeof portHeader === "string" && portHeader.match(/^\d+$/) && (tlsHeader === undefined || typeof tlsHeader === "string" && tlsHeader.match(/^(true|false)$/i))) {
    const host: string     = hostHeader;
    const port: number     = parseInt(portHeader);
    const usesTls: boolean = boolStrToBool(tlsHeader);


    // Select connect-listener by `usersTls`
    const connect = usesTls ?
      (port: number, host: string, listener: ()=>void) => tls.connect(port, host, {}, listener):
      (port: number, host: string, listener: ()=>void) => net.connect(port, host, listener);


    const client = connect(port, host, ()=>{
      console.log("on connection");
      req.on("data", (data)=>{
        client.write(data);
      });
    });

    client.on('data', (data: Buffer)=>{
      res.write(data);
    });

    client.on('close', ()=>{
      console.log('on close');
      res.end();
    });
  } else {
    console.log("Invalid host or port: ", hostHeader, portHeader);
    // Close response because host or port are invalid
    res.end();
  }
});
