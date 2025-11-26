import {NextResponse} from "next/server";
import {getHotels} from "../../../../lib/mock/api";

export async function GET(req, {params}) {
    const { countryId } = await params;
    const response = await getHotels(countryId);
    const data = await response.json();
    return NextResponse.json(data)
}