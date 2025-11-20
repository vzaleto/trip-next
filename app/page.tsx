import SearchForm from "@/app/components/SearchForm";
import SearchSection from "@/app/components/SearchSection";

export default function Home() {
    return (
        <div>
            <main style={{padding: 24, maxWidth: 820, margin: "0 auto"}}>
                <h1>Find your trip</h1>
                <SearchSection />
            </main>
        </div>
    );
}
