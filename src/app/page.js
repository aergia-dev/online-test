'use client'

import Link from 'next/link';
import LoginForm from './login/page';
import test from "../component/db";
import { getSession } from './login/action';
import { redirect } from 'next/dist/server/api-utils';
import { useRouter } from 'next/navigation';

// import {  useEffect } from 'react';

export default function loginPage() {
  // const [session, setSession] = useState(); 

  const router = useRouter();

  // useEffect(() => {
    // getSession().then(session => {
    //   console.log("action  - session", session);
    //   // setSession(session);
    //   // return 11;
    //   router.push('/pages/user');
    // }).catch(error => {
    //   console.error(error);
    // });

  // }, []);


  // if (session?.isLoggedIn) {
  //   if (session.isAdmin)
  //     redirect('/pages/admin');
  //   else
  //     redirect('/pages/user');
  // }
  // else
  return <LoginForm />
}
