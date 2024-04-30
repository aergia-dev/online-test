'use client'

import { getCurrentQuestion, setTestResultDb, setFinishTestDb } from "@/component/db";
import { useState, useEffect } from "react";
import { getSessionInfo } from "@/app/login/action";
import marking from './marking'

function shuffle(question) {
    for (let i = question.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question[i], question[j]] = [question[j], question[i]];
    }

    return question;
}


export default function testPage() {
    const [questions, setQuestions] = useState([]);
    const [session, setSession] = useState();
    const [testResult, setTestResult] = useState({});
    const [testFinish, setTestFinish] = useState(false);

    useEffect(() => {
        const fetchTest = async () => {
            // const onGoing = await getTestOnGoin();
            // setOnGoing(onGoing);

            const test = await getCurrentQuestion();
            console.log("??", test);
            const testQuestion = test['question'];
            const question = shuffle(testQuestion);
            question.map((q) => {
                q.selectedAnswer = 0;
            });

            //add color for marking answer is different color
            setQuestions(test['question']);
            const userInfo = await getSessionInfo();
            setSession(userInfo);

        };

        fetchTest();
    }, []);

    function markAnswer(e, uuid, idx) {
        const newQuestions = questions;
        const foundIdx = newQuestions.findIndex(q => q.uuid === uuid);
        if (foundIdx !== -1) {
            newQuestions[foundIdx]['selectedAnswer'] = idx;
        } else {
            console.log("error ??");
        }

        // setQuestions(newQuestions); -> didn't rendering
        setQuestions([...newQuestions]);
        const answer = { uuid: uuid, selected: idx }
        setTestResultDb(session, answer);
    }

    const setTestEnd = async () => {
        console.log("submit", session);
        // setFinishTestDb(session.clientId);
        setTestFinish(true);
        setTestResult(await marking(session));

        // const ttt = await marking();
        // console.log("marking", ttt, ttt['score']);
    }
    // if (!onGoing)
    //     return <div> not yet start</div>
    // else

    const Footer = () => {
        if (testFinish === false) {
            return (
                <div className='mx-auto'>
                    <button className='bg-blue-500 rounded-full w-32 h-8 mx-8'
                        onClick={setTestEnd}> 제 출 </button>
                </div>
            )
        } else {
            return (
                <div>
                    <p> score: {testResult.score}</p>
                    <p> pass : {testResult.passed ? "시험 통과함" : "시험 통과하지 못함"}</p>
                    {testResult.passed ? (
                        <a href="/pages/user/survey" className="bg-blue-500 block mt-4 lg:inline-block lg:mt-0 font-bold  mr-4">
                            go to survey
                        </a>
                    ) : (
                        <div> .... </div>
                        // <a href="/pages/user/survey" className="bg-blue-500 block mt-4 lg:inline-block lg:mt-0 font-bold  mr-4">
                        //    go to survey 
                        // </a>
                    )}
                </div>
            )
        }
    }

    return (
        <div className="flex flex-col">
            <div className='mx-auto'>
                {session?.userName + ' ' + session?.userAffiliation};
            </div>
            <div className='py-4 space-y-4 mx-auto'>
                {questions &&
                    (questions.map(({ uuid, question, selection, selectedAnswer }, qIdx) => (
                        <div className=''
                            key={uuid}>
                            <p>{(qIdx + 1) + '. ' + question}</p>
                            {selection.map(({ idx, item }) => (
                                ((selectedAnswer === idx) ?
                                    <p className='ml-4 text-red-400'
                                        key={uuid + idx}
                                        onClick={(e) =>
                                            markAnswer(e, uuid, idx)}>
                                        {idx + ". " + item}
                                    </p>
                                    :
                                    <p className='ml-4'
                                        key={uuid + idx}
                                        onClick={(e) => markAnswer(e, uuid, idx)}>
                                        {idx + ". " + item}
                                    </p>
                                ))
                            )}
                        </div>
                    )))}
                <div className="justify-items-center">
                    <Footer />
                </div>
            </div>
        </div>
    );
}