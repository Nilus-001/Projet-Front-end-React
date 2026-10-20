const URL_API = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = "AIzaSyDCrepavpt14biZ4IG_iELgsYsvGDB5Qvg";

export async function searchBooks(query) {
    const url = new URL(URL_API);
    url.searchParams.set("q", query);
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("maxResults", "12");

    const data = fetchUrl(url).then(res => res.json())

    console.log(url);
    console.log(data);
    return data;

}

async function fetchUrl(url) {
    try {
        let response =  await fetch(url);

        while (!response.ok) {
            response = await fetch(url);
        }

        return response;
    } catch (err) {
        console.error(err);
        return null;
    }
}


export async function getBookById(id) {
    const url = new URL(URL_API +"/"+ id);
    url.searchParams.set("key", API_KEY);

    const data = fetchUrl(url).then(res => res.json())

    console.log(url);
    console.log(data);
    return data;
}

