import * as net  from "net";
import * as http from "http";

// Connection command example: curl -H "X-HOST: example.com" -H "X-PORT: 80" --data-binary @req.txt localhost:8181
export const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse)=>{
  const hostHeader = req.headers['x-host'];
  const portHeader = req.headers['x-port'];

  // Enable CORS
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, X-Host, X-Port"
  });

  if (typeof hostHeader === "string" && typeof portHeader === "string" && portHeader.match(/^\d+$/)) {
    const host: string = hostHeader;
    const port: number = parseInt(portHeader);

    const client = new net.Socket();
    client.connect(port, host, ()=>{
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
