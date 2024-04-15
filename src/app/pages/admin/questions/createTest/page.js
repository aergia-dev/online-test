'use client'
import { useState } from 'react';
import  LevelDropdown  from './init';

export default function CreateTest() {
    // const [questionCnt, setQuestionCnt] = useState("null");
    // const questions = getQuestionPool();
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row w-full">
                <div className="flex space-x-4 space-y-4">
                    <LevelDropdown />
                </div>
            </div>
        </div>
    );
}