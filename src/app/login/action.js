'use server'

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import useSession from "./use-session"
import { DefaultSession, defaultSession, sessionOptions } from "./lib";

const sessionOption = {
    idNum: undefined,
    name: undefined,
    affiliation: undefined,
    isAdmin: undefined,
    password: "jozxoyVCab8/kWLYrRyBoaiavQ90FU+boQ/gBNevsEw=",
    cookieName: "online-test"
}

// export async function getSession() {
//     console.log("in the getSession ", cookies());
//     const session = await getIronSession(cookies(), sessionOption);
//     console.log("get session: " , session);
//     // console.log("session: " , session.cookieName);


//     // session.idNum = undefined;
//     // session.name = undefined;
//     // session.affiliation = undefined;

//     return session;
// }

// export async function loginAction(formData) {
//     const session = await getIronSession(cookies(), sessionOptions);

//     const input = {
//         idNum: formData.get('userId'),
//         name: formData.get('username'),
//         affiliation: formData.get('userAffiliation')
//     }

//     const admin = {
//         idNum: "",
//         username: "admin",
//         affiliation: ""
//     };

//     let nextPage = '/';

//     if (admin === input) {
//         session.isAdmin = true;
//         session.userId = "admin";
//         session.usedrname = "admin";
//         nextPage = '/pages/admin';
//     }
//     else {
//         session.isAdmin = false;
//         session.useId = input.idNum;
//         session.username = input.name;
//         session.userAffiliation = input.affiliation;
//         nextPage = '/pages/user';
//     }

//     await session.save();

//     console.log("nextPage", nextPage);
//     console.log("save session", session);

//     const loadSession = await getIronSession(cookies(), sessionOptions);
//     console.log("load session", loadSession);
//     redirect('pages/user');

// }


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
        userAffiliation: session.userAffiliation
    };
}


export async function getSession() {
    const session = await getIronSession(cookies(), sessionOptions);

    console.log("get session", session);
    if (!session.isLoggedIn) {
        session.isLoggedIn = defaultSession.isLoggedIn;
        session.username = defaultSession.userName;
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



