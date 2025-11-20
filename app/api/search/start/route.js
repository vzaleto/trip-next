import {NextResponse} from "next/server";
import {startSearchPrices} from "../../../../lib/mock/api";

export async function POST(req) {
    const body = await req.json().catch(() => ({}));
    const countryID = body.countryID ?? body.countryId ?? body.country ?? null;
    try {
        const response = await startSearchPrices(countryID);
        const data = await response.json();
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
        const err = await e.json().catch(() => ({}));
        return new Response(JSON.stringify(err), {status:e.status || 500})
    }
}
