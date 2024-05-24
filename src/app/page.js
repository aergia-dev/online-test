'use client'
import { LoginForm, ShowLoginInfo } from './login/login';
import { getSession } from './login/action';
import { useEffect, useState } from 'react';

export default function MainPage() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const bringSession = async () => {
      try {
        const s = await getSession()
        console.log(s);
        setSession(s);
      } catch (e) {
        console.log('err getSession()', e);
      }
    };
    bringSession();
  }, []);


  if (session === null)
    return <div>loading..</div>
  else {
    return (
      <div className='flex items-center h-screen justify-center'>
        {session.clientId ?
          (<ShowLoginInfo session={session} setSession={setSession}/>)
          :
          (<LoginForm setSession={setSession}/>)}
      </div>
    );
  }
}