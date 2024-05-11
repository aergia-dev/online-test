'use client'

import SelectTest from './selectTest'
import { useState, useEffect } from 'react'
import { setEndTestDb, setCurretnTestDB, getCurrentTestDB, getTestResultDb, getCurrentQuestionCnt, getTestOnGoing } from '@/component/db'

export default function Monitoring() {
  const [testOnGoing, setTestOnGoing] = useState();
  const [testTitle, setTestTitle] = useState(undefined);
  const [readingDb, setReadingDb] = useState(false);
  const [testResult, setTestResult] = useState([]);
  const [quesitonCnt, setQuestionCnt] = useState();

  const toggleTestOnGoing = async (status) => {
    if (testTitle) {
      //todo: move into db
      const minimumScore = 8;

      setTestOnGoing(status);
      setCurretnTestDB(testTitle, status, minimumScore);
      setReadingDb(status);

      console.log('status', status);
      //info: end of test
      if(status === false)
      {
        //move testResult in db to testResult.json
        await setEndTestDb();
      }
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
    const questionCnt = getCurrentQuestionCnt();
    setQuestionCnt(questionCnt);
  }, []);

  useEffect(() => {
    let intervalId;
    // if (readingDb) {
      intervalId = setInterval(() => {
        readTestResult();
      }, 1000);
    // }

    return () => clearInterval(intervalId);
  }, [readingDb]);

  return (
    <div className='flex flex-col w-full'>
      <div className='flex flex-row gap-8 px-4 py-4 justify-center'>
        <SelectTest setTestTitle={setTestTitle} defaultVal={'choose'}> </SelectTest>
        <p> test: {testOnGoing ? "시험 중" : "시험 종료"}</p>
        <button className='rounded bg-blue-400'
          onClick={() => toggleTestOnGoing(!testOnGoing)}>
          {testOnGoing ? "stop" : "start"}
        </button>
      </div>
      <div className='flex justify-center'>
        <p> {testTitle} 시험 현황  </p>
      </div>
      <table className='table-auto'>
        <thead>
          <tr>
            <th> name </th>
            <th> id </th>
            <th> affiliation </th>
            <th> selected cnt </th>
            <th> end? </th>
          </tr>
        </thead>
        <tbody>
          {testResult && testResult.length > 0 && testResult.map((user, idx) => (
            <tr className='text-center'
              key={idx + '_' + user.userInfo.userName + '_' + user.userInfo.userId + '_' + user.userInfo.userAffiliation}>
              <td key={idx + '_' + user.userInfo.userName}>
                {user.userInfo.userName}
              </td>
              <td key={idx + '_' + user.userInfo.userId}>
                {user.userInfo.userId}
              </td>
              <td key={idx + '_' + user.userInfo.userAffiliation}>
                {user.userInfo.userAffiliation}
              </td>
              <td key={idx + '_' + user.resultQuestion.question.length}>
                {user.answeredQuestionCnt} / {user.questionCnt}
              </td>
              <td key={idx + '_' + "endTime"}>
                {user.endTime === undefined ? 'not ' : 'done'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}