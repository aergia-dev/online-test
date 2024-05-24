import { SessionOptions } from "iron-session";

export const SessionData = {
    userId: undefined,
    userName: undefined,
    userAffiliation: undefined,
    isAdmin: false,
}

export const defaultSession =
{
    userId: undefined,
    userName: undefined,
    userAffiliation: undefined,
    isAdmin: false,
}

export const sessionOptions = {
    password: 'Fb03dAZQb8uL0obBSukwJh+zxFyykmzsGT0MALumQsE=',
    cookieName: "online-test",
    cookieOptions: {
        secure: process.env.NODE_ENV === 'production',
    }
}

export function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}