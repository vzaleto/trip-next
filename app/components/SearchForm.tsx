"use client";
import {useState} from "react";
import GeoInput from "@/app/components/GeoInput";
import {GeoItem} from "@/types";
import {useTourSearch} from "@/hook/useTourSearch";

export default function SearchForm({onSubmit}: { onSubmit?: (payload: { geo: GeoItem, input: string }) => void }) {

    const {search, loading, results, error} = useTourSearch();
    const [selected, setSelected] = useState<GeoItem | null>(null);
    const [inputText, setInputText] = useState<string>("");
    const [countryId, setCountryId] = useState<string | null>(null);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!selected) return
        onSubmit?.({geo: selected, input: inputText});
        console.log("submit", selected, inputText)

        if (!countryId) return
        search(countryId).then(r => console.log(r));
    }
    console.log("results", results)
    return (
        <div>
            <form onSubmit={handleSubmit} style={{display: "flex", gap: 12, alignItems: "center"}}>
                <div style={{flex: 1}}>
                    <GeoInput value={selected}
                              placeholder="Where are you going?"
                              onChange={(elem) => {
                                  console.log("elem onchange",elem)
                                  setSelected(elem);
                                  setInputText(elem?.name ?? "");
                                  if(elem?.type === "country") {
                                      setCountryId(elem.id)
                                  }else {
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
                <button type="submit" style={{
                    padding: "10px 16px",
                    borderRadius: 6,
                    background: "#0b69ff",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                }}>Find
                </button>
            </form>
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
        </div>
    )


}
