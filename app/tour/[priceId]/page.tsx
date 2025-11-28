"use client";

import {useParams, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import { fetchHotelSingle, fetchPrices} from "@/lib/api/geo";
import {TourDetails} from "@/app/components/TourDetails";
import {Hotel, PriceItem} from "@/types";

export default function TourPage() {
    const {priceId} = useParams()

    const  searchParams = useSearchParams();
    const hotelID = searchParams.get('hotelID')

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [price, setPrice] = useState<PriceItem | null>(null);
    const [hotel, setHotel] = useState< Hotel | null>(null);

    useEffect(() => {
        let mounted = true;

        (async () => {
            try {
                if(!priceId) throw new Error("Price id not found")
                setLoading(true);
                setError(null);

                const priceData = await fetchPrices(priceId);

                if(!mounted) return;
                setPrice(priceData);

                const hotelData = await fetchHotelSingle(hotelID);

                if(!mounted) return;
                setHotel(hotelData);

            }catch(e){
                console.error(e)
                if(!mounted) return;
                setError(e.message || "Error loading price")
            }finally {
                if(mounted) setLoading(false)
            }

            })()

        return () => {
            mounted = false
        }
    }, [priceId]);


    if (loading) return <p style={{padding: 25}}>Loading...</p>
    if (error) return <p style={{padding: 25, color: "red"}}>{error}</p>
    if (!price) return <p style={{padding: 25}}>No price</p>

    return (
        <div>
            <TourDetails price={price} hotel={hotel}/>
        </div>
    )
}