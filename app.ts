import { serve, parse } from "./deps.ts";
import { fetchData } from "./fetchData.ts";
import { getCountries } from "./getCountries.ts";
const { args } = Deno;
const port = parse(args).port;
console.log(port);
const s = serve({ port });
for await (const req of s) {
  if (req.url == '/get_countries') {
    req.respond({
      body: `${JSON.stringify(await getCountries())}`,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    });
  }
  else if(req.url !== '/favicon.ico'){
    const israelNotFoundResponse = {ok:false, status: 404, statusText: 'A country that encourages terrorism'} 
    const response = !req.url.startsWith('/israel') ? await fetchData(`https://commits.top${req.url}.html`) : israelNotFoundResponse
    req.respond({
      body: `${JSON.stringify(response)}`,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      status: response.status
    });
  }
  
  
}
