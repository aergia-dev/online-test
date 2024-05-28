'use client'

import SelectTest from './selectTest'
import { useState, useEffect } from 'react'
import { getAllTestResultDb, deleteTitleDb, isExistTestResultDb, setEndTestDb, setCurrentTestDb, getCurrentTestDB, getTestResultDb, getCurrentQuestionCnt, getTestOnGoing } from '@/lib/db'
import { Dialog } from '@/app/component/confirmDialog'
import ShowTime from '@/app/component/elapsedTime'

export default function Monitoring() {
  const [testOnGoing, setTestOnGoing] = useState();
  const [testTitle, setTestTitle] = useState(undefined);
  const [readingDb, setReadingDb] = useState(false);
  const [testResult, setTestResult] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');
  const [dialogConfirmFn, setDialogConfirmFn] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    if (testOnGoing) {
      const startTime = Date.now();
      const intervalId = setInterval(() => {
        const s = Math.floor((Date.now() - startTime) / 1000);
        setElapsedTime({
        });

        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [testOnGoing]);

  const startTest = async () => {
    //todo: move into db
    const minimumScore = 1;


    const confirmFn = async () => {
      setTestOnGoing(true);
      await setCurrentTestDb(testTitle, true, minimumScore);

      setReadingDb(true);
      setIsDialogOpen(false);
    }

    const confirmWithRemoveFn = async () => {
      setTestOnGoing(true);
      await setCurrentTestDb(testTitle, true, minimumScore);

      setReadingDb(true);
      setIsDialogOpen(false);
    }

    const isExist = isExistTestResultDb(testTitle);
    if (isExist) {
      await deleteTitleDb(testTitle);
      setDialogMsg({ title: '시험 결과가 이미 있습니다. 삭제 후 새로 생성하시겠습니까?.', content: '' })
      setDialogConfirmFn(() => () => confirmWithRemoveFn());
    }
    else {
      setDialogMsg({ title: '시험을 시작합니다.', content: '' })
      setDialogConfirmFn(() => () => confirmFn());
    }

  }

  const endTest = async () => {
    const confirmFn = async () => {
      setReadingDb(false);
      //info: read final test result
      setTestOnGoing(false);
      await readTestResult();
      //info: move test result to testResult.json
      await setEndTestDb();
      setIsDialogOpen(false);
    }

    setDialogMsg({ title: '시험을 종료합니다.', content: '' })
    setDialogConfirmFn(() => () => confirmFn());
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@')
    // setReadingDb(false)
  }

  const toggleTestOnGoing = async (status) => {
    console.log('status', status);
    if (testTitle) {
      status ? startTest() : endTest();
      setIsDialogOpen(true);
    }
    else {
      alert("should select test");
    }
  }

  const readTestResult = async () => {
    const r = await getTestResultDb();
    setTestResult(r['userResult']);
    console.log("got result: ", r['userResult']);
  }

  useEffect(() => {
    const updateInitValue = async () => {
      const onGoing = await getTestOnGoing();
      setTestOnGoing(onGoing);

      if (onGoing) {
        const currentTest = await getCurrentTestDB();
        console.log("currentTest", currentTest);
        setTestTitle(currentTest.title);
      }
    }

    updateInitValue();
  }, []);

  useEffect(() => {
    let intervalId;
    if (readingDb) {
      intervalId = setInterval(() => {
        readTestResult();
      }, 1000);

      return () => {
        console.log('clearetimeinterval');
        clearInterval(intervalId);
      };
    }
  }, [readingDb]);

  return (
    <div className='flex flex-col w-full'>
      <Dialog
        isOpen={isDialogOpen}
        msg={dialogMsg}
        onCancel={() => setIsDialogOpen(false)}
        onConfirm={dialogConfirmFn} />

      <div className='flex flex-row gap-8 px-4 py-4 justify-center'>
        {testOnGoing ?
          '' :
          <SelectTest setTestTitle={setTestTitle} defaultVal={'choose'}> </SelectTest>
        }
        <p> {testOnGoing ? "시험 중" : "시험 종료"}</p>
        <button className='rounded bg-blue-400 w-16'
          onClick={() => toggleTestOnGoing(!testOnGoing)}>
          {testOnGoing ? "종료" : "시작"}
        </button>
      </div>

      <div className='flex justify-center items-center m-2'>
        <div className='flex-grow text-center font-bold'>
          {testTitle ? (<p> {testTitle} 시험 현황  </p>) : <p></p>}
        </div>
        <div className='justify-end'>
          <ShowTime preStr='경과 시간' second={elapsedTime} />
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>
      <table className='table-auto'>
        <thead>
          <tr>
            <th > 이름 </th>
            <th> 교번 </th>
            <th> 소속 </th>
            <th> 제출 문제 수/전체 </th>
            <th> 시험지 제출 </th>
            <th> 설문지 제출 </th>
          </tr>
        </thead>
        <tbody>
          {testResult && testResult.map((user, idx) => (
            <tr className='text-center'
              key={idx}>
              <td key={idx + '_userName_' + user.userInfo.userName}>
                {user.userInfo.userName}
              </td>
              <td key={idx + '_userId_' + user.userInfo.userId}>
                {user.userInfo.userId}
              </td>
              <td key={idx + '_userAffiliation_' + user.userInfo.userAffiliation}>
                {user.userInfo.userAffiliation}
              </td>
              <td key={idx + '_question' + user.resultQuestion.question.length}>
                {user.answeredQuestionCnt} / {user.questionCnt}
              </td>
              <td key={idx + '_' + "testEndTime"}>
                {user.userInfo.testEndTime === undefined ? '미제출' : '제출'}
              </td>
              <td key={idx + '_' + "survey"}>
                {user.userInfo.surveyEndTime === undefined ? '미제출' : '제출'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}