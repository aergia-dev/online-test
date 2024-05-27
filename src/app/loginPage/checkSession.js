import { useRouter } from "next/navigation";

export function isLogIn(session) {
    const notLogin = (session.userId === '') ||
        (session.userName === '') ||
        (session.userAffiliation === '') ||
        (session.clientId === '');


    console.log('notLogin', notLogin)
    return !notLogin;
}
export function isAdmin(session) {
    console.log('session', session)
    return session && session.isAdmin;
}