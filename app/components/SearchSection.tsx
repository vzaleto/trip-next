"use client";
import Index from "@/app/components/SearchForm";
import {GeoItem} from "@/types";

export default function SearchSection() {
    const handleSearch = (payload:{geo: GeoItem, input: string})=>{
        console.log(payload)
    }
   return <Index onSubmit={handleSearch} />
}