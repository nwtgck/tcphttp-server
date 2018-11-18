const net  = require("net");
const http = require("http");

const serverHost = "0.0.0.0";
// TODO: Hard code
const serverPort = "8181";

// Connection command example: curl -H "X-HOST: example.com" -H "X-PORT: 80" --data-binary @req.txt localhost:8181 
const server = http.createServer((req, res)=>{
  const host = req.headers['x-host'];
  const port = req.headers['x-port'];

  const client = new net.Socket();
  client.connect(port, host, ()=>{
    console.log("on connection");
    req.on("data", (data)=>{
      client.write(data);
    });
  });

  client.on('data', (data)=>{
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
