"use client";

import Link from "next/link";
import styles from "./TourCard.module.css";
import {TourCardProps} from "@/types";

function formatDate(iso: string) {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
}

function formatPrice(amount: number, currency: string) {
    const parts = String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return `${parts} ${currency.toUpperCase()}`;
}


export function TourCard({ priceId, amount, currency, startDate, endDate, hotel }: TourCardProps) {
    console.log("TourCard hotel", hotel)
    return (
        <div className={styles.card} >
            <div className={styles.media}>
                {
                    hotel?.img ? (
                        <img src={hotel.img} alt={hotel.name ?? "hotel"} className={styles.image} />
                    ) : (
                        <div className={styles.placeholder}>
                            Image
                        </div>
                    )
                }
            </div>
            
            <div className={styles.body}>
                <h3 className={styles.title} >{hotel?.name ?? `Hotel ${hotel?.id} ?? " "` }</h3>
                <div className={styles.info} >
                    <span>{hotel?.cityName ?? " "}</span>
                    <span>|</span>
                    <span>{hotel?.countryName ?? " "}</span>
                </div>
                <div className={styles.date} >
                    <span>{formatDate(startDate)}</span>
                    <span>-</span>
                    <span>{formatDate(endDate)}</span>
                </div>
                <div className={styles.manys}>
                    <div className={styles.price} > {formatPrice(amount, currency)} </div>
                    <Link href={`/tour/${priceId}?hotelID=${hotel?.id ?? ""}`} className={styles.link}>
                        Open price
                    </Link>
                </div>
            </div>

        </div>
    )
};