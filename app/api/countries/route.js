import {NextResponse} from "next/server";
import {getCountries} from "../../../lib/mock/api";

export async function GET() {
    const resp = await getCountries()
    const data = await resp.json()
    return NextResponse.json(data)
}