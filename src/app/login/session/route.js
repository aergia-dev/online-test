import { NextRequest, userAgent } from "next/server";
import { cookies } from "next/headers";
import { getIronSession } from "iron-session";
import { DefaultSession, sessionOptions } from "../lib";
import { sleep, SessionData } from "../lib";

export async function POST(req){
    const session = await getIronSession(cookies(), sessionOptions);

    const reqData = await req.json();
    const { username="No username", userAffiliation, userId} = reqData; 

    session.isLoggedIn = true;
    session.username = username;
    session.userAffiliation = userAffiliation;
    session.userId = userId;
    await session.save();

    console.log('##',JSON.stringify(session));
    return new Response(JSON.stringify(session), {
        headers: { 'Content-Type': 'application/json'}
    });
}

export async function GET() {
    const session = await getIronSession(cookies(), sessionOptions);

    if(session.isLoggedIn!== true) {
        return Response.json(DefaultSession);
    }

    return Response.json(session);
}

export async function DELETE() {
    const session = await getIronSession(cookies(), sessionOptions);
    session.destroy();
    return Response.json(DefaultSession);
}