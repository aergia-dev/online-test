'use client'
import React, { useState, useEffect } from 'react';
import { saveTestDb, getLevelQuestionsDB, getLevelDb, deleteQuestiondb } from '@/lib/db'
import { renderQuestionWithAnswer } from '@/app/component/renderQuestion';
import { DeleteConfirmDialog } from '@/app/component/confirmDialog';

export default function CreateTest({ props }) {
    const [levels, setLevels] = useState({});
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);
    const [selectedLevel, setSelectedLevel] = useState();
    const [question, setQuestion] = useState();
    const [selectedQ, setSelectedQ] = useState([]);
    const [nthTest, setNthTest] = useState("");

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState(null);
    const [dialogOnDeleteFn, setDialogOnDeleteFn] = useState(null);

    const readLevel = async () => {
        const levels = await getLevelDb();
        setLevels(levels);
        console.log('levels', levels);
    }


    const clearSelectedQ = () => {
        setSelectedQ([]);
    }

    useEffect(() => {
        readLevel();
    }, []);

    const readLevelQuestion = async (levelKey) => {
        const question = await getLevelQuestionsDB(levelKey)
        setQuestion(question);
    }

    const handleOptionClick = async (selectedLevel) => {
        setSelectedLevel(selectedLevel);
        setIsDropdownOpened(false);
        console.log('selectedLevel', selectedLevel);
        readLevelQuestion(selectedLevel['level']);
   }

    const selectQuestion = (Quuid, Qtype, Qtext, Qimg, Qselection, Qanswer) => {
        const curSelectedQ = selectedQ;
        const existItem = curSelectedQ.filter(q => q.Quuid === Quuid);

        if (existItem.length === 0) {
            setSelectedQ(curSelectedQ => {
                return [...curSelectedQ,
                { Quuid: Quuid, Qtype: Qtype, Qtext: Qtext, Qimg: Qimg, Qselection: Qselection, Qanswer: Qanswer }];
            });
        }
    };

    const removeQuestion = (Quuid, Qtype, Qtext, Qimg, Qselection, Qanswer) => {
        const curSelectedQ = selectedQ;
        const removed = curSelectedQ.filter(q => q.Quuid !== Quuid);
        setSelectedQ(removed);
    }

    const saveTestOnClick = async () => {
        console.log("save", nthTest, " - ", selectedQ);
        if (nthTest.trim() === '')
            alert('시험 이름 필요')
        else {
            await saveTestDb(nthTest, selectedQ);
            alert("시험 문제 선택 완료");
        }
    }
    const deleteQuestion = async (level, QuuidLst) => {
        console.log('deletefn', level, QuuidLst);
        await deleteQuestiondb(level, QuuidLst);
        readLevelQuestion(level);
        clearSelectedQ();
        setIsDialogOpen(false);
    }

    const deleteTestOnClick = async () => {
        console.log('delete', selectedLevel.level);
        const QuuidLst = selectedQ.map(q => q.Quuid);
        setDialogMsg('선택된 시험 문제를 삭제합니다.');
        setDialogOnDeleteFn(() => async () => await deleteQuestion(selectedLevel.level, QuuidLst));
        setIsDialogOpen(true);
    }

    const inputOnChange = (event) => {
        setNthTest(event.target.value);
    }

    return (
        <div className="flex flex-col w-full">
            <DeleteConfirmDialog msg={dialogMsg}
                isOpen={isDialogOpen}
                onCancel={() => setIsDialogOpen(false)}
                onConfirm={dialogOnDeleteFn} />
            <div className="flex flex-row w-full space-x-4 px-4 py-4 justify-center items-stretch">
                <div className="flex space-x-4 space-y-4 px-10 py-1 items-center">
                    <div className="relative inline-block text-left">
                        <div className=''>
                            <button type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
                                {selectedLevel ? selectedLevel['desc'] : "등급 선택"}
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {isDropdownOpened && (
                            <div className="absolute right-0 z-10 mt-2 w-32 text-center origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    {levels.map((levels, idx) => (
                                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id={"menu" + levels['level']}
                                            key={"menu" + levels['level']}
                                            onClick={() => handleOptionClick(levels)} >
                                            {levels['desc']}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='py-2'>
                    <label> 시험 회차: </label>
                    <input className="border rounded px-3 py-1 text-gray-800"
                        id="nthTest"
                        value={nthTest}
                        onChange={inputOnChange}>
                    </input>
                </div>
                <button className='bg-blue-600 text-white px-4 py-1 w-16 rounded-full'
                    onClick={() => { saveTestOnClick(); }}>
                    저장
                </button>
                <button className='bg-blue-600 text-white px-4 py-1 w-16 rounded-full'
                    onClick={() => { deleteTestOnClick(); }}>
                    삭제
                </button>
            </div>
            <div className='flex flex-row w-full'>
                <div className='w-1/2 y-2 gap-2 px-8'>
                    {renderQuestionWithAnswer(question, selectQuestion)}
                </div>
                <div className='w-1/2 y-2 gap-2 px-8 space-y-2'>
                    {renderQuestionWithAnswer(selectedQ, removeQuestion)}
                </div>

            </div>
        </div >
    );
}