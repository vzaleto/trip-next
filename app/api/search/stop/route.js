import {stopSearchPrices} from "../../../../lib/mock/api";
import {NextResponse} from "next/server";

export async function POST(req) {
    const body = await req.json().catch(() => ({}));
  const token = body.token;
  try{
    const response = await stopSearchPrices(token);
    const data = await response.json();
    return NextResponse.json(data)
  }catch(e){
    console.log(e)
    const err = await e.json().catch(() => ({}));
    return new Response(JSON.stringify(err), {status: e.status || 500})
  }
}