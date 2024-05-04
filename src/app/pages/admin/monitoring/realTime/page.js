'use client'

import SelectTest from './selectTest'
import { useState, useEffect } from 'react'
import { setAllTestResultDb, setCurretnTestDB, getCurrentTestDB, getTestResult, getCurrentQuestionCnt, getTestOnGoing } from '@/component/db'

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
        await setAllTestResultDb();
      }
    }
    else {
      alert("should select test");
    }
  }

  const readTestResult = async () => {
    const r = await getTestResult();
    console.log("got result: ", r);
    setTestResult(r['userResult']);
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
          {testResult && testResult.length > 0 && testResult.map((result, idx) => (
            <tr className='text-center'
              key={idx + '_' + result.userInfo.userName + '_' + result.userInfo.userId + '_' + result.userInfo.userAffiliation}>
              <td key={idx + '_' + result.userInfo.userName}>
                {result.userInfo.userName}
              </td>
              <td key={idx + '_' + result.userInfo.userId}>
                {result.userInfo.userId}
              </td>
              <td key={idx + '_' + result.userInfo.userAffiliation}>
                {result.userInfo.userAffiliation}
              </td>
              <td key={idx + '_' + result.answer.length}>
                {result.answer.length}
              </td>
              <td key={idx + '_' + "endTime"}>
                {result.endTime === undefined ? 'not ' : 'done'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}