import { DOMParser } from "./deps.ts";
export async function getCountries() {
    const url = 'https://commits.top/'
    const response = await fetch(url);
    const document = new DOMParser().parseFromString(
        await response.text(),
        "text/html",
    )!;
    const countriesList = document.querySelectorAll(".country-list a") || [];
    const listOfCountries = [...countriesList].map((e)=>{
        return {
            country: e.textContent.trim(),
            slug: e.childNodes[0].parentElement?.attributes.href.split('.')[0],
        }
    })
    return  listOfCountries
}

