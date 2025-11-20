import {NextResponse} from "next/server";
import {getHotel} from "../../../../lib/mock/api";

export async function GET(req, {params}) {

    const {hotelId} = params;
    try{
        const response = await getHotel(hotelId);
        const data = await response.json();
        return NextResponse.json(data)
    }catch (e){
        console.log(e)
        const err = await e.json().catch(() => ({}));
        return new Response(JSON.stringify(err), {status: e.status || 500})
    }
}