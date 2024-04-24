'use client'

import SelectTest from './selectTest'
import { useState, useEffect } from 'react'
import { setCurretnTestDB, getTestResult, getCurrentQuestionCnt } from '@/component/db'

export default function Monitoring() {
  const [testOnGoing, setTestOnGoing] = useState();
  const [testTitle, setTestTitle] = useState(undefined);
  const [readingDb, setReadingDb] = useState(false);
  const [testResult, setTestResult] = useState([]);
  const [quesitonCnt, setQuestionCnt] = useState();

  const toggleTestOnGoing = (status) => {
    if (testTitle) {
      setTestOnGoing(status);
      setCurretnTestDB(testTitle, status);
      setReadingDb(status);
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
    // setTestOnGoing(false);
    let intervalId;
    if (readingDb) {
      intervalId = setInterval(() => {
        readTestResult();
      }, 5000);

      return () => clearInterval(intervalId);
    }

    const questionCnt = getCurrentQuestionCnt();
    setQuestionCnt(questionCnt);
  }, [readingDb])

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row gap-8 px-4 py-4 justify-center'>
        <SelectTest setTestTitle={setTestTitle}> </SelectTest>
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
          {testResult.length > 0 && testResult.map((result) => (
            <tr className='text-center'>
              <td> {result.userInfo.userName} </td>
              <td> {result.userInfo.userId} </td>
              <td> {result.userInfo.userAffiliation} </td>
              <td> {result.answer.length}</td>
              <td> {result.endTime === undefined ? 'not ' : 'done' }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  )
}