import * as net  from "net";
import * as http from "http";

const serverHost: string = "0.0.0.0";
// TODO: Hard code
const serverPort: number = 8181;

// Connection command example: curl -H "X-HOST: example.com" -H "X-PORT: 80" --data-binary @req.txt localhost:8181 
const server = http.createServer((req: http.IncomingMessage, res: http.OutgoingMessage)=>{
  const hostHeader = req.headers['x-host'];
  const portHeader = req.headers['x-port'];

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

server.listen(serverPort, serverHost, ()=>{
  console.log(`Running on ${serverPort}...`);
});
