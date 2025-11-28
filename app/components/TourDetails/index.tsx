import styles from "./TourDetails.module.css";
import {TourDetailsProps} from "@/types";
import {
    Wifi,
    Waves,
    Medal,
    Shirt,
    ParkingSquare, Check, X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const serviceIcons :Record<string, LucideIcon> = {
    wifi: Wifi,
    aquapark: Waves,
    tennis_court: Medal,
    laundry: Shirt,
    parking: ParkingSquare
}

export function TourDetails({price, hotel}: TourDetailsProps) {
    const formatDate = (dateStr: string) => {
        const d = new Date(dateStr);
        return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
    }
    return (
        <div className={styles.wrapper}>
            <h1 className={styles.title}>{hotel.name}</h1>
            <div className={styles.topSection}>
                <div className={styles.imageWrapper}>
                    {hotel.img && <img src={hotel.img} alt={hotel.name}/>}
                </div>
                <div className={styles.details}>
                    <div className={styles.detailItem}>
                        <strong>Country / City:</strong> {hotel.countryName} / {hotel.cityName}
                    </div>
                    <div className={styles.detailItem}>
                        <strong>Dates:</strong> {formatDate(price.startDate)} — {formatDate(price.endDate)}
                    </div>
                    <div className={`${styles.detailItem} ${styles.price}`}>
                        <strong>Price:</strong> {String(price.amount).replace(/\B(?=(\d{3})+(?!\d))/g, " ")} {price.currency?.toUpperCase()}
                    </div>
                    <button className={styles.bookButton}>Book</button>
                </div>
            </div>
            <div className={styles.bottomSection}>
                <h3>Description Hotel</h3>
                <p>{hotel.description ?? "Опис відсутній"}</p>

                <h4>Сервіси/зручності</h4>
                {hotel.services ? (
                    <ul className={styles.servicesList}>
                        {Object.entries(hotel.services).map(([key, value]) => {
                                const Icon = serviceIcons[key];
                                console.log(" serviceIcons[key]",Icon)
                                return (
                                    <li key={key}>
                                        <div style={{width: "16px", height: "16px"}}>
                                            {Icon && <Icon size={16} /> }
                                        </div>
                                        <strong>{key}:</strong>
                                        {value === "yes" ? <Check size={16}/> : <X size={16} color="red"/>}
                                        {String(value)}
                                    </li>
                                )
                            }
                        )}
                    </ul>
                ) : (
                    <p>Info about Hotel not found</p>
                )}
            </div>
        </div>
    )
}