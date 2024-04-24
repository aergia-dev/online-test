// 'use client'

// import Link from 'next/link';
import LoginForm from './login/page';

export default function loginPage() {
  // const [session, setSession] = useState(); 

  // const router = useRouter();

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
