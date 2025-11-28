"use client";
import {useEffect, useState} from "react";
import GeoInput from "@/app/components/GeoInput";
import {GeoItem} from "@/types";
import {useTourSearch} from "@/hook/useTourSearch";
import {Hotel, PriceItem} from "@/types";
import {useHotelsCache} from "@/hook/useHotelsCache";
import {TourGrid} from "@/app/components/TourGrid";

import styles from "./SearchForm.module.css";


export default function Index({onSubmit}: { onSubmit?: (payload: { geo: GeoItem, input: string }) => void }) {

    const {search, loading, results, error} = useTourSearch();
    const {get} = useHotelsCache();
    const [selected, setSelected] = useState<GeoItem | null>(null);
    const [inputText, setInputText] = useState<string>("");
    const [countryId, setCountryId] = useState<string | null>(null);
    const [hotels, setHotels] = useState<Record<string, Hotel> | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selected) return
        onSubmit?.({geo: selected, input: inputText});
        console.log("submit", selected, inputText)

        if (!countryId) return
        await search(countryId);
        const hotels = await get(countryId);
        console.log("hotels handleSubmit", hotels)
        setHotels(hotels ?? null);

    }
    return (
        <div>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div style={{flex: 1}}>
                    <GeoInput value={selected}
                              placeholder="Where are you going?"
                              onChange={(elem) => {
                                  console.log("elem onchange", elem)
                                  setSelected(elem);
                                  setInputText(elem?.name ?? "");
                                  if (elem?.type === "country") {
                                      setCountryId(elem.id)
                                  } else {
                                      setCountryId(null)
                                  }
                              }}
                              onInputChange={(text) => {
                                  setInputText(text);
                                  if (!text) {
                                      setSelected(null)
                                      setCountryId(null)
                                  }
                              }}/>
                </div>
                <button disabled={loading} type="submit" className={styles.buttonFinder}>Find
                </button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {results && results ? (
                <TourGrid
                    items ={ results ? Object.values(results) : []  }
                    hotels={hotels}
                />
            ) : (
                !loading && <div>No results</div>
            )}
        </div>
    )
}
