import * as net  from "net";
import * as http from "http";

const serverHost: string = "0.0.0.0";
// TODO: Hard code
const serverPort: number = 8181;

// Connection command example: curl -H "X-HOST: example.com" -H "X-PORT: 80" --data-binary @req.txt localhost:8181 
const server = http.createServer((req: http.IncomingMessage, res: http.OutgoingMessage)=>{
  // TODO: Not to use `as`
  const host: string = req.headers['x-host'] as string;
  // TODO: Not to use `as`
  const port: number = parseInt((req.headers['x-port'] as string) || "80");

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
});

server.listen(serverPort, serverHost, ()=>{
  console.log(`Running on ${serverPort}...`);
});
