'use client'

import { getCurrentTestDB, getQuestionDB, getCurrentQuestion, setTestResult } from "@/component/db";
import { useState, useEffect } from "react";
import { getIronSession } from "iron-session";
import { sessionOptions } from "@/app/login/lib";
import { getSession, getSessionInfo } from "@/app/login/action";


function shuffle(question)
{
    for(let i = question.length -1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question[i], question[j]] = [question[j], question[i]];
    }

    return question;
}

export default function testPage() {
    const [questions, setQuestions] = useState([]);
    const [session, setSession] = useState();

    useEffect(() => {
        const fetchTest = async () => {
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

   const markAnswer = (e, uuid, idx) => {
        const newQuestions = questions;
        const foundIdx  = newQuestions.findIndex(q => q.uuid === uuid);
        console.log("newQuestions ", newQuestions);
        console.log("found idx ", foundIdx);
        if(foundIdx !== -1)
        {
            newQuestions[foundIdx]['selectedAnswer'] = idx;
        }else {
            console.log("error ??");
        }

        // setQuestions(newQuestions); -> didn't rendering
        setQuestions([...newQuestions]);
        console.log("after questions ", newQuestions);

        // console.log(getSession());
    }

    const submitAnswer = () => {
        //get session info 
        // setTestResult
    }

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
                                    onClick={(e) => markAnswer(e, uuid, idx)}>
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
                <button className='bg-blue-500'> submit </button>
            </div>
        </div>
    );
}