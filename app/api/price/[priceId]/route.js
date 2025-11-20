import {NextResponse} from "next/server";
import {getHotels} from "../../../../lib/mock/api";

export async function GET(req, {params}) {
    const {countryId} = params;
    дуе
    try {
        const resp = await getHotels(countryId);
        const data = await resp.json();
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
        const err = await e.json().catch(() => ({}));
        return new Response(JSON.stringify(err), {status: e.status || 500})
    }
}