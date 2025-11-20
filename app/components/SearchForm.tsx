"use client";
import {useState} from "react";
import GeoInput from "@/app/components/GeoInput";
import {GeoItem} from "@/types";

export default function SearchForm({onSubmit}: {onSubmit? : (payload:{geo: GeoItem, input: string}) => void}) {
    const [selected, setSelected] = useState< GeoItem | null >(null);
    const [inputTest, setInputTest] = useState <string>("");

    const handleSubmit =(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!selected) return
        onSubmit?.({geo: selected, input: inputTest});
        console.log("submit", selected, inputTest)
    }
return(
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div style={{flex:1}}>
            <GeoInput value={selected} placeholder="Where are you going?" onChange={(elem)=>{ setSelected(elem); setInputTest(elem?.name ?? "" )}} onInputChange={(text)=>{setInputTest(text); if(!text) setSelected(null)}} />
        </div>
        <button type="submit"  style={{
            padding: "10px 16px",
            borderRadius: 6,
            background: "#0b69ff",
            color: "#fff",
            border: "none",
            cursor: "pointer",
        }}>Find</button>
    </form>
)







}
