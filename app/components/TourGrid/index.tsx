import {TourCard} from "@/app/components/TourCard";
import styles from "./TourGrid.module.css";
import {Hotel, PriceItem} from "@/types";


export function TourGrid({items, hotels}: { items: PriceItem[], hotels: Record<string, Hotel> | null | undefined }) {

    return (

        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.grid}>
                    {
                        items.map((elem) => {
                            console.log("TourGrid elem.hotelId", elem.hotelID)
                            const hotel = hotels ? hotels[Number(elem.hotelID)] ?? null : null;
                            console.log("TourGrid", hotel)
                            return (
                                <div key={elem.id} className={styles.cell}>
                                    <TourCard priceId={elem.id}
                                              amount={elem.amount}
                                              currency={elem.currency}
                                              startDate={elem.startDate}
                                              endDate={elem.endDate}
                                              hotel={hotel}
                                    />
                                </div>
                            );

                        })}
                </div>
            </div>
        </div>
    );
}