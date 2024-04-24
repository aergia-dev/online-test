'use client'

import SelectTest from './selectTest'
import { useState, useEffect } from 'react'
import { setCurretnTestDB } from '@/component/db'

export default function Monitoring() {
  const [testOnGoing, setTestOnGoing] = useState();
  const [testTitle, setTestTitle] = useState(undefined);

  const toggleTestOnGoing = (status) => {
    if (testTitle) {
      setTestOnGoing(status);
      setCurretnTestDB(testTitle, status);
    }
    else {
      alert("should select test");
    }
  }

  useEffect(() => {
    setTestOnGoing(false);
  }, [])

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

    </div>

  )
}