
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
    rootRef: React.RefObject<HTMLDivElement | null>,
    inputRef: React.RefObject<HTMLInputElement | null >  ,
    open: boolean,
    setOpen: (v: boolean) => void,
    loading: boolean,
    query: string,
    items: GeoItem[],
    handleInputFocus:  () => void,
    handleInputClick: () => void,
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    placeholder: string,
    handleSelect: (item: GeoItem) => void,
    handleCLose: () => void
}
export interface PriceItem{
    id: string;
    amount: number;
    currency: string;
    startDate: string;
    endDate: string;
    hotelID: string;
}
export interface Hotel{
    id: string;
    name: string;
    img?: string;
    cityName: string;
    countryName: string;
    description?: string;
    services: {
        wifi:string;
        aquapark: string;
        tennis_court: string;
        laundry: string;
        parking:string;
    }
}
export interface TourDetailsProps {
    price: PriceItem;
    hotel: Hotel
}
export interface TourCardProps {
    priceId: string;
    amount: number;
    currency: string;
    startDate: string;
    endDate: string;
    hotel: {
        id: string;
        name: string;
        img?: string;
        cityName: string;
        countryName: string;
        description?: string
    } | null
}
