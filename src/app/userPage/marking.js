'use server'

import { getCurrentTestDB, setFinalizeTestResulttDb, getUserTestResultDb, getTestQuestionForUserDb } from "@/lib/db"

export default async function marking(session) {
    console.log(session)
    const questions = await getTestQuestionForUserDb();
    const testStatus = await getCurrentTestDB();

    // use it -> session.clientId.
    const testResult = await getUserTestResultDb(session)
    //marking

    //todo: change to reduce()
    let correctCnt = 0;
    questions['question'].map((q) => {
        if (q.Qtype === 'multChoice') {
            const answer = q.Qanswer.answers.slice().sort();
            const choice = q.Qanswer.userAnswer.slice().sort();
            if(answer.every((v, idx) => v === choice[idx]))
                correctCnt += 1;
        }
        else {
            //toto: make string separate with , or space and compare
            if(q.Qanswer.answers ===  q.Qanswer.userAnswer)
                correctCnt += 1;
        }
    });

    testResult['userInfo'].score = correctCnt;
    testResult.question = questions;

    setFinalizeTestResulttDb(testResult);
    const isPassed = testStatus.minScore <= correctCnt;
    console.log("isPassed", testStatus.minScore, correctCnt);
    return { score: testResult['userInfo'].score, passed: isPassed }
}