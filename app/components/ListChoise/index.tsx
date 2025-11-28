import {ListChoiceProps} from "@/types";
import styles from "./ListChoice.module.css";
import {Globe} from "lucide-react";
import {Building2} from "lucide-react";
import {Hotel} from "lucide-react";

export default function ListChoice({
                                       inputRef,
                                       open,
                                       handleCLose,
                                       loading,
                                       query,
                                       items,
                                       handleInputFocus,
                                       handleInputClick,
                                       handleInputChange,
                                       rootRef,
                                       placeholder,
                                       handleSelect
                                   }: ListChoiceProps) {

    return (

        <div ref={rootRef} className={styles.wrapper}>
            <input ref={inputRef} className={styles.input} type="text" value={query} placeholder={placeholder}
                   onFocus={handleInputFocus} onChange={handleInputChange} onClick={handleInputClick}
                   onKeyDown={(e) => {
                       if (e.key === "Escape") {
                           handleCLose?.();
                           return;
                       }
                       if (e.key === "Enter") {
                           e.preventDefault();
                           if (items.length > 0) {
                               handleSelect(items[0]); // ← выбираем первый вариант
                               inputRef.current?.focus();
                           }
                       }
                   }}/>
            {open && (
                <div role="listbox" className={styles.dropdown}>
                    {loading && <div className={styles.loading}>Loading...</div>}
                    {!loading && items.length === 0 && <div className={styles.noResults}>No results</div>}
                    {items.map((elem) => (
                        <div key={elem.id} role="option" aria-selected={false}
                             onClick={() => handleSelect(elem)}
                             className={styles.dropdownItem}>
          <span className={styles.flagIcon}>
            {elem.type === "country" ? <Globe size={18}/> : ""}
              {elem.type === "city" ? <Building2 size={18}/> : ""}
              {elem.type === "hotel" ? <Hotel size={18}/> : ""}
          </span>
                            <div className={styles.itemContent}>
                                <div className={styles.itemName}>{elem.name}</div>
                                <div className={styles.itemType}>{elem.type}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>


    )
}
