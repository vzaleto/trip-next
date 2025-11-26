import {useCallback, useRef, useState} from "react";
import {getSearchPrices, startSearchPrices, stopSearchPrices} from "@/lib/mock/api";

interface PriceResult {
    id: string;
    amount: number;
    currency: string;
    startDate: string;
    endDate: string;
    hotelID: string
}
interface SearchResponse {
    token: string;
    waitUntil: string
}
export function useTourSearch() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<Record<string, PriceResult[]> | null>(null);
    const [error, setError] = useState<string | null>(null);
    const activeToken = useRef<string | null>(null);
    const isCanceled = useRef(false);


    const waitUntil = (isoTime: string) => {
        const target = new Date(isoTime).getTime();
        const delay = Math.max(0, target - Date.now());
        return new Promise((resolve) => setTimeout(resolve, delay));
    };

    const cancelPrevious = useCallback(async () => {

        isCanceled.current = true;

        const token = activeToken.current;

        if (!token) return;

        try {
            await stopSearchPrices(token);
        } catch {

        } finally {
            activeToken.current = null;
        }

    }, [])

    const fetchCycle = useCallback(async (token: string) => {

        let retries = 0;

        while (!isCanceled.current) {

            try {
                const response = await getSearchPrices(token);
                const body = await response.json();
                console.log("useTourSearch", body)

                if (response.status === 200) {
                    setResults(body.prices);
                    return;
                }

                if (response.status === 425) {
                    await waitUntil(body.waitUntil);
                    continue;
                }

                throw new Error(body.message || 'Something went wrong with the server');

            } catch (e) {

                retries++;

                if (retries >= 3) {

                    setError('Something went wrong with the server');

                    return;
                }

                await new Promise((resolve) => setTimeout(resolve, 800));
            }
        }
    }, [])

    const search = useCallback(async (countryID: string) => {
        if (activeToken.current) {
            await cancelPrevious();
        }
        setLoading(true);
        setError(null);
        setResults(null)
        isCanceled.current = false;

        try {
            const response = await startSearchPrices(countryID);
            const body:SearchResponse = await response.json();

            activeToken.current = body.token;

            await waitUntil(body.waitUntil)
            await fetchCycle(body.token);

        } catch {
            setError('Searching was not starting')
        } finally {
            setLoading(false)
        }
    }, [cancelPrevious, fetchCycle]);

    return {loading, results, error, search}
}

