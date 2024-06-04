import { redirect, useRouter } from "next/navigation";
import { getSession } from "./action";
import { resolve } from "styled-jsx/css";

export function isLogIn(session) {
    const notLogin = (session.userId === '') ||
        (session.userName === '') ||
        (session.userAffiliation === '') ||
        (session.clientId === '');


    console.log('notLogin', notLogin)
    return !notLogin;
}

export async function redirectForAdmin() {
     const checkSession = async () => {
        const session = await getSession();
        return session && session.isAdmin;
     }
     const result = await checkSession();
   
     if(!result){
        redirect('/');
     }
}

export async function redirectForAdminclient(session) {
    const router = useRouter();
     const checkSession = async () => {
        const session = await getSession();
        return session && session.isAdmin;
     }
     const result = await checkSession();
   
     if(!result){
        router.push('/');
     }
}

export function isAdmin(session) {
    return session && session.isAdmin;
}