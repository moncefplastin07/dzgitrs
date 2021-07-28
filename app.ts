import { serve } from "https://deno.land/std@0.103.0/http/server.ts";
import { parse } from "https://deno.land/std/flags/mod.ts";

import { DOMParser } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
const url = "https://commits.top/algeria.html";
const response = await fetch(url);
const document = new DOMParser().parseFromString(
  await response.text(),
  "text/html",
)!;

const usersTable = document.querySelector(".users-list tbody")?.querySelectorAll(
  "tr",
)!;

const header = {
  lastUpdate: document.querySelector('code')?.textContent,
  by: {
    name:'Moncef Gaha',
    email: 'x@moncefgaha.me',
    site: 'https://moncefgaha.me'
  }
}
const usersList = ([...usersTable].map((userColmun) => {
  return {
    score: +userColmun.children[0]?.textContent.split(".")[0],
    URL: userColmun.children[1]?.querySelector("a")?.getAttribute("href"),
    name: userColmun.children[1]?.lastChild.nodeValue?.substring(
      1,
      userColmun.children[1].lastChild.nodeValue.length - 1,
    ),
    username: userColmun.children[1]?.querySelector("a")?.getAttribute("href")
      ?.split("/").at(-1),
    contribs: +userColmun.children[2]?.textContent,
    avatar:
      userColmun.children[3]?.querySelector("img")?.attributes["data-src"],
  };
}));

const { args } = Deno;
const port = parse(args).port;
console.log(port)
const s = serve({ port });
for await (const req of s) {
  req.respond({
    body: `${JSON.stringify({header, users:usersList})}`,
    headers: new Headers({
      "Content-Type": "application/json",
    }),
  });
}
