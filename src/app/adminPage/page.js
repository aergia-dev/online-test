'use client'
import Navbar from './navbar'
import { useState, useEffect } from 'react';
import { isAdmin } from '../loginPage/checkSession';
import { getSession } from '../loginPage/action';
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [session, setSession] = useState(null);
  const route = useRouter();

  useEffect(() => {
    const prep = async () => {
      const session = await getSession();
      setSession(session);
    };
    prep();
  }, [])

  if (session) {
    console.log('##', session);
    if (isAdmin(session)) {
      return (
        < div >
          <div> 문제 관리: 문제 추가, 삭제, 시험 문제 선택, 설문지 설정 </div>
          <div> 시험 관리: 시험 시작, 종료, 현황 확인 </div>
        </div >)
    }
    else {
      route.push('/');
    }

  }
  else {

    return <div> Loading. </div>
  }
}
