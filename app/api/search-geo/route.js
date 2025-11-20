import {NextResponse} from "next/server";
import {searchGeo} from "../../../lib/mock/api";

export async function GET(req) {

    const url = new URL(req.url);
    const q = url.searchParams.get('q') || '';
    const response = await searchGeo(q);
    const data = await response.json();
    return NextResponse.json(data)

}
