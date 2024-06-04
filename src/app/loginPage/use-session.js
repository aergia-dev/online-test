import useSWR from 'swr';
import { SessionData, DefaultSession } from './lib';
import useSWRMutation from 'swr/mutation';
import { redirect } from 'next/navigation';

const sessionApiRoute = '/login/session';

async function fetchJson(input, init) {
    return fetch(input, {
        heaers: {
            accept: "application/json",
            "content-type": "applications/json",
        },
        ...init,
    }).then((res) => res.json());
}

function doLogin(url, {arg}) {
    console.log("do log in. url", url, arg);
    return fetchJson(url, {
        method: 'POST',
        body: JSON.stringify(arg),
    });
}


function doLogout(url) {
    return fetchJson(url, {
        method: "DELETE",
    });
}

export default function useSession() {
    const {session, isLoading} = useSWR(
        sessionApiRoute,
        fetchJson, { fallbackData: DefaultSession},
    ) ;
    
    const {trigger: login} = useSWRMutation(sessionApiRoute, doLogin, {
        revalidate: false,
    });
    const {trigger: logout} = useSWRMutation(sessionApiRoute, doLogout);

    return {session, logout, login, isLoading};
}
