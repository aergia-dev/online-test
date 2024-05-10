'use server'

import {getCurrentTestDB, setFinalizeTestResulttDb, getUserTestResultDb, getTestQuestionForUserDb } from "@/component/db"

export default async function marking(session) {
    console.log(session)
    const testStatus = await getCurrentTestDB();
    const questions= await getTestQuestionForUserDb();

    // use it -> session.clientId.
    const testResult = await getUserTestResultDb(session)
    //marking

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