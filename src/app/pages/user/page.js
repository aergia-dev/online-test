'use client'

import { getTestQuestionForUserDb, setTestResultDb, makeInitialTestResultDb } from "@/component/db";
import { useState, useEffect } from "react";
import { getSessionInfo } from "@/app/login/action";
import marking from './marking'
import { renderQuestionForUser } from "../common/renderQuestion";

function shuffle(question) {
    console.log("shuffle", question)
    for (let i = question.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [question[i], question[j]] = [question[j], question[i]];
    }

    return question;
}


export default function TestPage() {
    const [questions, setQuestions] = useState([]);
    const [session, setSession] = useState();
    const [testResult, setTestResult] = useState({});
    const [testFinish, setTestFinish] = useState(false);

    useEffect(() => {
        const fetchCurTest = async () => {
            const curTest = await getTestQuestionForUserDb();
            console.log("curTest ", curTest);
            const testQuestion = curTest['question'];
            console.log("testQuestion ", testQuestion);
            const question = shuffle(testQuestion);

            console.log('question - useeffect', question)
            setQuestions(question);
            const userInfo = await getSessionInfo();
            setSession(userInfo);
            makeInitialTestResultDb(userInfo);
        };

        fetchCurTest();
    }, []);

    function markAnswerMultiChoice(Quuid, qIdx) {
        const newQuestions = questions;
        const foundIdx = newQuestions.findIndex(q => q.Quuid === Quuid);
        const realIdx = qIdx + 1;

        if (foundIdx !== -1) {
            //info: remove prev answer
            if (newQuestions[foundIdx]['Qanswer']['answerCnt'] == 1)
                newQuestions[foundIdx]['Qanswer']['userAnswer'] = [];

            //info: remove when already exist 
            if (newQuestions[foundIdx]['Qanswer']['userAnswer'].includes(realIdx)) {
               newQuestions[foundIdx]['Qanswer']['userAnswer'] = newQuestions[foundIdx]['Qanswer']['userAnswer'].filter((a) => a !== realIdx);
            }
            else {
                newQuestions[foundIdx]['Qanswer']['userAnswer'].push(realIdx);
            }
        } else {
            console.log("error ??");
        }

        setQuestions([...newQuestions]);
        const userChoice = { Quuid: Quuid, Qtype: 'mutlChoice', userAnswer: realIdx }
        setTestResultDb(session, userChoice);
    }

    function makrAnswerEssay(Quuid, answerText) {
        const newQuestions = questions;
        const foundIdx = newQuestions.findIndex(q => q.Quuid === Quuid);

            console.log(Quuid);
        if (foundIdx !== -1) {
        newQuestions[foundIdx]['Qanswer']['userAnwser'] = [];
        newQuestions[foundIdx]['Qanswer']['userAnwser'].push(answerText)

        setQuestions([...newQuestions]);
        const answer = { Quuid: Quuid, Qtype: 'essay', userAnswer: answerText }
        setTestResultDb(session, answer);
        }
        else {
            console.log("makrAnswerEssay err");
        }
    }


    const setTestEnd = async () => {
        console.log("submit", session);
        // setFinishTestDb(session.clientId);
        setTestFinish(true);
        setTestResult(await marking(session));
    }

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
                {renderQuestionForUser(questions, markAnswerMultiChoice, makrAnswerEssay)}
               <div className="justify-items-center">
                    <Footer />
                </div>
            </div>
        </div>
    );
}