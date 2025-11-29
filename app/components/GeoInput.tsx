"use client";

import {useRef, useState} from "react";
import {GeoInputProps, GeoItem} from "@/types";
import ListChoice from "@/app/components/ListChoise";
import {fetchCountries, fetchGeoSearch} from "@/lib/api/geo";
import {useClickOutside} from "@/hook/useClickOutside";
import {delaySearch} from "@/hook/useDelaySearch";


export default function GeoInput({value = null, placeholder = "Where", onChange, onInputChange,onEnter}: GeoInputProps) {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState<string>(value?.name ?? '');
    const [items, setItems] = useState<GeoItem[]>([]);
    const [loading, setLoading] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const lastRequestedQuery = useRef<string>("");

    const loadCountries = async () => {
        setLoading(true);
        try {
            const arr = await fetchCountries();
            setItems(arr);
        } catch (error) {
            console.error("loadCountries err", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    }

    const loadSearch = async (q: string) => {
        if (!q || q.trim().length === 0) {
            await loadCountries();
            return;
        }
        lastRequestedQuery.current = q;
        setLoading(true);
        try {
            const arr = await fetchGeoSearch(q)
            if (lastRequestedQuery.current === q) {
                setItems(arr);
            }
        } catch (error) {
            console.error("searchGeo err", error);
            setItems([]);
        } finally {
            setLoading(false);
        }
    };

    const debouncedSearch = useRef(delaySearch((q: string) => loadSearch(q), 300)).current;

    useClickOutside(rootRef, () => setOpen(false));

    const handleInputFocus = async () => {
        setOpen(true);

        if (!query) {
            await loadCountries();
        }
        else {
            await loadSearch(query);
        }
            // if (value?.type === "country") {
            //     await loadCountries();
            // } else {
            //     await loadSearch(query);
            // }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const v = e.target.value;
        console.log("v", v)
        setQuery(v);
        onInputChange?.(v);
        setOpen(true);
        debouncedSearch(v);

    }

    const handleSelect = async (item: GeoItem) => {
        setQuery(item.name);
        onChange?.(item);
        onInputChange?.(item.name);

        if(item.type === "country"){
           await loadCountries();
        }else{
           await loadSearch(item.name);
        }

        setOpen(true);
        inputRef.current?.focus();
    }

    const handleInputClick = async () => {
        if (!open) {
            await handleInputFocus();
            // inputRef.current?.focus();
        }
    }
    const closeList = () => {
        console.log("closeList")
        setOpen(false);
    }

    return (
        <ListChoice rootRef={rootRef} setOpen={setOpen} inputRef={inputRef} open={open} query={query} items={items} loading={loading}
                    handleSelect={handleSelect} placeholder={placeholder} handleInputFocus={handleInputFocus}
                    handleInputClick={handleInputClick} handleInputChange={handleInputChange} handleCLose={closeList} onEnter={onEnter}/>
    )
};





