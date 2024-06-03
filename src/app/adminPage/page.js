import { redirectForAdmin } from '@/app/loginPage/checkSession';

export default async function AdminPage() {
  await redirectForAdmin();
  return (
    < div >
      <div> 문제 관리: 문제 추가, 삭제, 시험 문제 선택, 설문지 설정 </div>
      <div> 시험 관리: 시험 시작, 종료, 현황 확인 </div>
    </div >)
}
