import Link from 'next/link';
import LoginForm  from './login/page';
import test from "../component/db";

export default function loginPage() {
  console.log("before test");
  test();
  console.log("after test");
  return <LoginForm />
}
