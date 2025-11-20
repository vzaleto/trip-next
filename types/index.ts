export interface GeoItem {
    id: string | number,
    name: string,
    type?: "country" | "city" | "hotel",
    flag?: string
}

export interface GeoInputProps {
    value?: GeoItem | null,
    placeholder?: string,
    onChange?: (item: GeoItem | null) => void,
    onInputChange?: (text: string) => void
}
export interface ListChoiceProps {
    rootRef: React.RefObject<HTMLDivElement>,
    inputRef: React.RefObject<HTMLInputElement> ,
    open: boolean,
    setOpen: (v: boolean) => void,
    loading: boolean,
    query: string,
    items: GeoItem[],
    handleInputFocus:  () => void,
    handleInputClick: () => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    handleSelect: (item: GeoItem) => void
}