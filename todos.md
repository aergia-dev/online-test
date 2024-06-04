
## todo
1. login page 작성
    * 관리자, 사용자를 교번, 소속, 이름을 입력받아 구분(관리자 입력 값 고장)
    * 관리자는 관리 page로 redirection
    * 일반 유저를 시험 문제 page redirection
2. 관리자 page
    * 1문제씩 입력하여 db에 저장 
    * 저장된 문제 보기 
    * 회차 시험 문제 선택하여 저장 및 불러오기
    * 일반 유저 모니터링
    * 결과물 산출 as excel file
    * 설문 조사 값을 변경 page
    * 시험 시작 page
3. 일반 사용자
    * 문제 + 답 선택 가능 
    * 문제 답을 고르면 server에 전달 -> 진행 사항 모니터링
    * 제출시 server에서 채점 후 결과 표시
    * 통과 하지 못일 경우
        * 재시험 여부를 관리자가 선택해야 함 
    * 통과할 경우 
        * 설문 조사 진행 
        * 설문 조사 재출시 완료
    * 시간 제한 있음

## 기본 구조
1. next.js + react + tailwindcss 로 진행
2. podman으로 실행 환경 묶어서 배포 
3. file로 db를 export 할수 있어야 하고, 시작시 해당 file을 읽어서 초기화
4. 외부 server에 올리지 않고, 이동(?) 가능하게 하기 위함

## 수정해야 할것들 
1. 문제 입력
    1. 텍스트만 입력하는 창 + 이미지 포함 창 두개 필요
        1. image는 base64로 encoding
    1. 미리보기에서 답이 여러개인 경우 
    1. 저장시 답이 없으면 저장 안되게 해야 함
    1. 문제 입력에서 주관식도 지원해야 함
1. 일반 사용자의 경우 시험이 시작되어 있지 않으면 접속 거부
1. 재시험 관련 시나리오
    1. 관리 page에서 재시험 button click시 해당 user의 testResult를 삭제
    1. user는 새로 고침하여 문제를 다시 받음 
    1. user가 시험 문제를 받을 때, testresult의 end time이 있으면 재시험 불가 msg 표시
1. 문제 pdf로 출력
    1. 문제별 길이가 달라 출력 방법 확인 필요
1. 설문 조사 pdf로 출력
1. 설문 조사 통계
1. page 이동시 session 값 사용, session 값이 없으면 login page로 redirect
