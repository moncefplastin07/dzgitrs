import { DOMParser } from "./deps.ts";
export async function  fetchData(url: string) {
  const response = await fetch(url);
  const {ok, status} = response;
  if (!ok) {
    return {ok, status}
  }
  const document = new DOMParser().parseFromString(
    await response.text(),
    "text/html",
  )!;

  const usersTable = document.querySelector(".users-list tbody")
    ?.querySelectorAll(
      "tr",
    ) || [];

    const header = {
        lastUpdate: document.querySelector("section p code")?.textContent || null,
        country: document.querySelector('.wrapper section h1')?.textContent.split(' in ').at(-1)?.trim(),
        countrySlug: url.split('/').at(-1)?.trim().split(".")[0],
        totalUsersNumber: Number(document.querySelector('.wrapper section b')?.textContent),
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
  return {ok, status, data:{ header, users: usersList }};
}
