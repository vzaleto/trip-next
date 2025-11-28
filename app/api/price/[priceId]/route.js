import {NextResponse} from "next/server";
import {getPrice} from "../../../../lib/mock/api";

export async function GET(req, {params}) {
    const {priceId} = await params;
    try {
        const resp = await getPrice(priceId);
        const data = await resp.json();
        console.log(data)
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
        const err = await e.json().catch(() => ({}));
        return new Response(JSON.stringify(err), {status: e.status || 500})
    }
}