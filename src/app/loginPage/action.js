'use server'

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { DefaultSession, defaultSession, sessionOptions } from "./lib";

const sessionOption = {
    userId: undefined,
    userName: undefined,
    userAffiliation: undefined,
    logInTime: undefined,
    isAdmin: undefined,
    password: "jozxoyVCab8/kWLYrRyBoaiavQ90FU+boQ/gBNevsEw=",
    cookieName: "online-test"
}

export async function getSession() {
    const session = await getIronSession(cookies(), sessionOptions);
    console.log("get session", session);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
        session.userName = defaultSession.userName;
    }

    //todo: timeOut.
    // if(session.logInTime())
    const sessionData = {
        userId: session.userId,
        userName: session.userName,
        userAffiliation: session.userAffiliation,
        clientId: session.clientId
    }

    return sessionData;
}

export async function login(formData) {
    console.log("login");
    const session = await getIronSession(cookies(), sessionOptions);
    session.userId = formData.get('userId').trim();
    session.userName = formData.get('userName').trim();
    session.userAffiliation = formData.get('userAffiliation').trim();
    session.isAdmin = false;
    session.isLoggedIn = true;
    session.clientId = crypto.randomUUID();
    session.logInTime = new Date();

    if (session.userName === 'admin')
        session.isAdmin = true;

    await session.save();
    //todo: search other way to routing? not in login page
    // loginRedirect(session);

    if (session.isAdmin)
        redirect('/adminPage');
    else
        redirect('/userPage');
}

export async function loginRedirect(session){
    if (session.isAdmin)
        redirect('/adminPage');
    else
        redirect('/userPage');
}

export async function logout() {
    console.log('log out');
    const session = await getIronSession(cookies(), sessionOptions);

    console.log('session', session)
    session.destroy();
}

export async function isLoggedInsLogIn() {
    const session = await getSession();
    return session.isLogIn;
}

export async function isLoggedIn(session) {
    return session.isLoggedIn;
}

