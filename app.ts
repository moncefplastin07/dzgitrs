import { serve, parse } from "./deps.ts";
import { fetchData } from "./fetchData.ts";
const { args } = Deno;
const port = parse(args).port;
console.log(port);
const s = serve({ port });
for await (const req of s) {
  if(req.url !== '/favicon.ico'){
    const usersList = await fetchData(`https://commits.top${req.url}.html`)
  req.respond({
    body: `${JSON.stringify(usersList)}`,
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
  }
  
}
