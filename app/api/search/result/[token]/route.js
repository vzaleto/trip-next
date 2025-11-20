import {getSearchPrices} from "../../../../../lib/mock/api";
import {NextResponse} from "next/server";

export async function GET(req, {params}) {
    const {token} = params;
    try {
        const resp = await getSearchPrices(token);
        const data = await resp.json();
        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
        const err = await e.json().catch(() => ({}));
        return new Response(JSON.stringify(err), {status: e.status || 500})
    }
}
