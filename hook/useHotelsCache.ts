import {useCallback, useRef, useState} from "react";
import {fetchHotels} from "@/lib/api/geo";


interface Hotel {
    id: string | number;
    name: string;
    img?: string;
    cityName: string;
    countryName: string;
    cityId?: string | number;
    countryId?: string | number;
}

export function useHotelsCache() {

    const cacheRef = useRef(new Map<string | number, {
        data?: Record<string, Hotel>,
        loading?: boolean,
        error?: string
    }>());
    const [, tick] = useState(0);

    const get = useCallback(async (countryId: string | number) => {
        const key = String(countryId);
        const cached = cacheRef.current.get(key);
        if (cached?.data) return cached.data
        if (cached?.loading) {
            return new Promise<Record<string, Hotel> | undefined>((resolve) => {
                const interval = setInterval(() => {
                    const cur = cacheRef.current.get(key);
                    if (cur && cur.data) {
                        clearInterval(interval);
                        resolve(cur.data)
                    }
                    if (cur && cur.error) {
                        clearInterval(interval);
                        resolve(undefined)
                    }
                }, 100)
            })
        }

        cacheRef.current.set(key, {loading: true});
        tick(v => v + 1);

        try {

            const data = await fetchHotels(countryId);

            // const data = await response.json();
            console.log(data, 'response')
            cacheRef.current.set(key, {data: data});
            tick(v => v + 1);
            return data as Record<string, Hotel>;
        } catch (error) {
            cacheRef.current.set(key, {error: error?.message || 'error'});
            tick(v => v + 1);
            return undefined;
        }

    }, []);

    const read = useCallback((countryId: string | number) => {
        return cacheRef.current.get(String(countryId));
    }, []);

    return {
        get,
        read
    }

}
