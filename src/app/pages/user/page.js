'use client'

import { getCurrentTestDB,  getQuestionDB} from "@/component/db";
import { useState, useEffect } from "react";

export default function testPage() {
    const [curTest, setCurTest] = useState([]);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        setCurTest(getCurrentTestDB());
        console.log("cur Test", curTest);
        setQuestions(getQuestionDB(curTest['title']));
        console.log("test q", questions);
    }, []);

    return (
        <div className="flex flex-col">
            <div>
                교번, 소속, 이름 from session
            </div>
            <div>
                {questions && 
                    (questions.map(({ uuid, question, selection }) => (
                        <div>
                            <p>{question}</p>
                        </div>
                    ))
                    )}
            </div>
        </div>
    );
}