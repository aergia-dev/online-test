import { redirectForAdmin } from '@/app/loginPage/checkSession'

export default async function monitoring() {
  await redirectForAdmin();
  return <div> 왼쪽 메뉴 선택 </div>
}