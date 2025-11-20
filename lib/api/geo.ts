
import {GeoItem} from "@/types";

export const fetchCountries = async () => {
    const response: [] = await fetchJson('api/countries')
    return Object.values(response).map((elem:{id: string, name: string, flag: string}) => ({...elem, type: "country" as const}));
}
export const fetchGeoSearch = async (q: string) => {
    const url = `/api/search-geo?q=${encodeURIComponent(q)}`;
    const data = await fetchJson(url);
    console.log("fetchGeoSearch", data)
    return Object.values(data).map((elem: any) => ({...elem, id: elem.id ?? elem.id})) as GeoItem[];
}
export async function fetchJson(url: string, options?: RequestInit) {
    const response = await fetch(url, {...options});
    const text = await response.text();
    try {
        const json = text ? JSON.parse(text) : null;
        if (!response.ok) {
            const err = new Error(json?.message ?? response.statusText);
            err.status = response.status;
            err.body = json;
            throw err;
        }
        return json;
    } catch (e) {
        console.log(e)
        if (!response.ok) {
            const err = new Error(response.statusText);
            err.status = response.status;
            throw err;
        }
        return null
    }
}