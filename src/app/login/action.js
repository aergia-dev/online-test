'use server'

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import useSession from "./use-session"
import { DefaultSession, defaultSession, sessionOptions } from "./lib";

const sessionOption = {
    userId: undefined,
    userName: undefined,
    userAffiliation: undefined,
    isAdmin: undefined,
    password: "jozxoyVCab8/kWLYrRyBoaiavQ90FU+boQ/gBNevsEw=",
    cookieName: "online-test"
}

export async function getSessionInfo() {
    const session = await getIronSession(cookies(), sessionOptions);

    console.log("get session", session);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
        session.userName = defaultSession.userName;
    }

    return {
        userName: session.userName,
        userId: session.userId,
        userAffiliation: session.userAffiliation,
        clientId: session.clientId
    };
}


export async function getSession() {
    const session = await getIronSession(cookies(), sessionOptions);

    console.log("get session", session);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
        session.userName = defaultSession.userName;
    }

    return session;
}

export async function login(formData) {
    'use server';
    console.log("login");
    const session = await getSession();
    session.userId = formData.get('userId');
    session.userName = formData.get('userName');
    session.userAffiliation = formData.get('userAffiliation');
    session.isAdmin = false;
    session.isLoggedIn = true;
    session.clientId = crypto.randomUUID();

    if (session.userName === 'admin')
        session.isAdmin = true;

    await session.save();
    //todo: search other way to routing? not in login page

    if (session.isAdmin)
        redirect('/pages/admin');
    else
        redirect('/pages/user');
}

export async function logout() {
    'use server';
    const session = await getSession();
    session.destroy();
}



