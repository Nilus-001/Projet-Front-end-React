const URL_API = "https://www.googleapis.com/books/v1/volumes";
const API_KEY = "AIzaSyAjX7MzFV-x8_aesWOLKiQ4-Z7iqpzQs_w";

export default async function searchBooks(query) {
    const url = new URL(URL_API);
    url.searchParams.set("q", query);
    url.searchParams.set("key", API_KEY);
    url.searchParams.set("maxResults", "12");

    try {
        let response =  await fetch(url);

        while (!response.ok) {
            response = await fetch(url);

        }

        const data = await response.json();

        console.log(url);
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
        return [];
    }
}