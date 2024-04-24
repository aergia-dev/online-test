'use client'

import { getCurrentQuestion, setTestResult,  setFinishTest } from "@/component/db";
import { useState, useEffect } from "react";
// import { getIronSession } from "iron-session";
// import { sessionOptions } from "@/app/login/lib";
import { getSessionInfo } from "@/app/login/action";


function shuffle(question) {
    for (let i = question.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question[i], question[j]] = [question[j], question[i]];
    }

    return question;
}

function updateStatus(userInfo, answer) {
}

export default function testPage() {
    const [questions, setQuestions] = useState([]);
    const [session, setSession] = useState();
    const [onGoing, setOnGoing] = useState(false);

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
        // console.log("after questions ", newQuestions);

       const answer = { uuid: uuid, selected: idx }

        console.log("!!! answer", uuid, idx);
       setTestResult(session, answer);
    }

    const setTestEnd = (e, uuid, idx) => {
        console.log("submit");
        setFinishTest();
   }
    // if (!onGoing)
    //     return <div> not yet start</div>
    // else
    return (
        <div className="flex flex-col">
            <div>
                {session?.userName + ' ' + session?.userAffiliation};
            </div>
            <div className='py-4 space-y-4'>
                {questions &&
                    (questions.map(({ uuid, question, selection, selectedAnswer }, qIdx) => (
                        <div key={uuid}>
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
                <div className="">

                </div>
            </div>
            <div>
                <button className='bg-blue-500'
                onClick={setTestEnd}> submit </button>
            </div>
        </div>
    );
}