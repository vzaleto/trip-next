import {ListChoiceProps} from "@/types";
import {useState} from "react";

export default function ListChoice( {inputRef, open, setOpen, loading, query, items, handleInputFocus, handleInputClick, handleInputChange, rootRef, placeholder, handleSelect}: ListChoiceProps) {

    return (
        <div ref={rootRef} className="relative" style={{position: "relative", width: "100%"}}>
            <input
                ref={inputRef}
                type="text"
                value={query}
                placeholder={placeholder}
                onFocus={handleInputFocus}
                onChange={handleInputChange}
                onClick={handleInputClick}
                className="w-full p-2 border border-gray-300 rounded-md"
                onKeyDown={(e) => {
                    if (e.key === "escape") setOpen(false)
                }}
                style={{
                    width: "100%",
                    padding: "10px 12px",
                    borderRadius: 6,
                    border: "1px solid #ccc",
                }}
            />
            {open && (
                <div role="listbox"
                     style={{
                         position: "absolute",
                         top: "calc(100% + 6px)",
                         left: 0,
                         right: 0,
                         background: "#fff",
                         border: "1px solid #ddd",
                         borderRadius: 8,
                         boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                         zIndex: 50,
                         maxHeight: 320,
                         overflow: "auto",
                     }}>
                    {loading ? (
                        <div style={{padding: 12}}>Loading...</div>
                    ) : items.length === 0 ? (
                        <div style={{padding: 12}}>No results</div>
                    ) : (
                        items.map((elem) => (
                            <div
                                key={String(elem.id)}
                                role="option"
                                onClick={() => handleSelect(elem)}
                                style={{
                                    display: "flex",
                                    gap: 10,
                                    alignItems: "center",
                                    padding: "10px 12px",
                                    cursor: "pointer",
                                    borderBottom: "1px solid #f3f3f3",
                                }}>
                                 <span style={{width: 28, textAlign: "center"}}>
                  {elem.type === "country" ? (elem.flag ?
                      <img src={elem.flag} alt="" style={{width: 22, height: 14}}/> : "🌍") : ""}
                                     {elem.type === "city" ? "🏙️" : ""}
                                     {elem.type === "hotel" ? "🏨" : ""}
                </span>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <div style={{fontWeight: 600}}>{elem.name}</div>
                                    <div style={{fontSize: 12, color: "#666"}}>{elem.type}</div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    )
}
