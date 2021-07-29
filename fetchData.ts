import { DOMParser } from "./deps.ts";
export async function  fetchData(url: string) {
  const response = await fetch(url);
  const document = new DOMParser().parseFromString(
    await response.text(),
    "text/html",
  )!;

  const usersTable = document.querySelector(".users-list tbody")
    ?.querySelectorAll(
      "tr",
    ) || [];

    const header = {
        lastUpdate: document.querySelector("code")?.textContent,
        by: {
          name: "Moncef Gaha",
          email: "x@moncefgaha.me",
          site: "https://moncefgaha.me",
        },
      };
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
  return { header, users: usersList };
}
