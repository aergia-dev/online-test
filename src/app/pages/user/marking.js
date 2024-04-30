'use server'

import {getCurrentTestDB, setFinalizeTestResulttDb, getUserTestResultDb, getCurrentQuestion } from "@/component/db"

export default async function marking(session) {
    console.log(session)
    const testStatus = await getCurrentTestDB();
    //read question 
    const questions= await getCurrentQuestion();
    // use it -> session.clientId.
    const testResult = await getUserTestResultDb(session)
    //marking

    //return {testResult: {score: 0, passed: true}}
    // testResult.map(())
    // console.log('2222', questions)
    // console.log('33333', testResult)
    testResult['answer'].map(({uuid, answer}) => {
        const idx = questions['question'].findIndex((q) => q.uuid === uuid);
        questions['question'][idx].choice = answer;
    });

    //todo: change to reduce()
    let correctCnt = 0;
    questions['question'].map((q) => {
        if(q.answer === q.choice)
            correctCnt += 1; 
    });

    testResult['userInfo'].score = correctCnt;
    testResult.question = questions;

    setFinalizeTestResulttDb(testResult);
    const isPassed = testStatus.minScore <= correctCnt; 
    console.log("isPassed", testStatus.minScore, correctCnt);
    return {score: testResult['userInfo'].score , passed: isPassed}
}