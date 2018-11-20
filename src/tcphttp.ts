import * as net  from "net";
import * as tls  from "tls";
import * as http from "http";
import * as url from "url";
import {ParsedUrlQuery} from "querystring";
import {opt, optMap} from "./utils";

const HOST_PARAM_NAME = "host";
const PORT_PARAM_NAME = "port";
const TLS_PARAM_NAME  = "tls";

/**
 * Convert bool string to boolean value
 * @param {string} boolStr
 * @returns {boolean}
 */
function boolStrToBool(boolStr: string | undefined): boolean {
  if (boolStr === undefined) {
    return false;
  } else {
    switch (boolStr.toLocaleLowerCase()) {
      case "":
      case "true":
        return true;
      default:
        return false;
    }
  }
}

export const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse)=>{
  // Get query parameter
  const query = opt(optMap(url.parse, req.url, true).query) as ParsedUrlQuery | undefined;

  // Enable CORS
  res.writeHead(200, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
  });

  if (query !== undefined &&
      typeof query[HOST_PARAM_NAME] === "string" &&
      typeof query[PORT_PARAM_NAME] === "string" && (query[PORT_PARAM_NAME] as string).match(/^\d+$/) &&
      (query[TLS_PARAM_NAME] === undefined || typeof query[TLS_PARAM_NAME] === "string" && (query[TLS_PARAM_NAME] as string).match(/^(true|false|)$/i))) {

    const host: string     = query[HOST_PARAM_NAME] as string;
    const port: number     = parseInt(query[PORT_PARAM_NAME] as string);
    const usesTls: boolean = boolStrToBool(query[TLS_PARAM_NAME] as string | undefined);


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
    console.log("Invalid query: ", query);
    // Close response because host or port are invalid
    res.end();
  }
});
