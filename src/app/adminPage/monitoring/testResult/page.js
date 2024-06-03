'use client'
import { getAllTestResultTitlesDb, getAllTestResultDb, deleteTitleDb, deleteUserTestResultDb } from "@/lib/db"
import { useRef, useState, useEffect, useContext } from "react"
import makeSurveyResult from "./makeSurveyResult/makeSurveyResult";
import { DeleteConfirmDialog } from "@/app/component/confirmDialog";
import { makeQuestionPdf, makeSurveyPdf, mqp } from "./makePdf";
import { MathJaxBaseContext, MathJaxContext, MathJax } from 'better-react-mathjax'
import Script from "next/script";
import Head from 'next/head';
import { RenderQuestionPrint } from "@/app/common/renderQuestion";

//     {testResult: 
//         {title: '',
//     starTime: 'time',
// userResult: []}

export default function TestResult() {
    const [titles, setTitles] = useState();
    const [selectedTitle, setSelectedTitle] = useState();
    const [isDropdownOpened, setIsDropdownOpened] = useState();
    const [testResult, setTestResult] = useState();
    const questionRef = useRef();
    const [questionPreview, setQuestionPreview] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [dialogMsg, setDialogMsg] = useState(null);
    const [dialogOnDeleteFn, setDialogOnDeleteFn] = useState(null);
    const questionPreviewRef = useRef('');
    const [qPreview, setQPreview] = useState('');
    const [isMathjaxReady, setIsMathjaxReady] = useState(false);
    const [mathJaxTest, setmathJaxTest] = useState(null);

    useEffect(() => {
        const readTitles = async () => {
            const readTitles = await getAllTestResultTitlesDb();
            setTitles(readTitles);
            console.log('readTitles', readTitles);
        }

        readTitles();
    }, []);

    const handleTitleClick = async (title) => {
        setSelectedTitle(title);
        setIsDropdownOpened(!isDropdownOpened)
        if (title) {
            const testResult = await getAllTestResultDb(title);
            setTestResult(testResult);
        }
    }

    const handleRemoveTitle = async (title) => {
        const onDeleteTitle = async (title) => {
            await deleteTitleDb(title);
            const newTitle = titles.filter(v => v !== title);
            setTitles([...newTitle]);
            setIsDialogOpen(false);
        }
        setDialogMsg('"' + title + '" 시험 결과를 삭제하시겠습니까?');
        setDialogOnDeleteFn(() => () => onDeleteTitle(title));
        setIsDialogOpen(true);
    }


    const handleRemoveUserInfo = async (selectedTitle, userInfo) => {
        const onDeleteUserResult = async (selectedTitle, userInfo) => {
            await deleteUserTestResultDb(selectedTitle, userInfo.clientId);
            setTestResult((prev) => {
                const newUserResult = prev.userResult.filter(result => result.userInfo.clientId !== userInfo.clientId);
                return {
                    ...prev,
                    "userResult": newUserResult
                }
            });
            setIsDialogOpen(false);
        }
        setDialogMsg('" 교번: ' + userInfo.userId + ', 이름:' + userInfo.userName + ', 소속:' + userInfo.userAffiliation + '" 시험 결과를 삭제하시겠습니까?');
        setDialogOnDeleteFn(() => () => onDeleteUserResult(selectedTitle, userInfo));
        setIsDialogOpen(true);

    }

    useEffect(() => {
        const checkMathJax = async () => {
            if (mathJaxTest) {
                await mathJaxTest.typesetPromise();
                setTimeout(() => mqp(null, document.getElementById('mathJaxContext'), 1000))

                // await mqp(null, document.getElementById('questionPdf'));
            }
        }

        if (questionPreview) {
            checkMathJax();
        }
        else {
            console.log("questionPreview is null");
        }

    }, [questionPreview])

    useEffect(() => {
        const checkMathJax = async () => {
            if (window.MathJax) {
                setmathJaxTest(window.MathJax);
                //await window.MathJax.typesetPromise();
                // setIsMathjaxReady(t);
                console.log('############', window.MathJax);
            }
            else {
                console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
            } 
        };
        checkMathJax();
    }, []);

    const makeDocs = async (userInfo, survey, questions, questionEle) => {
        console.log('makeDocs');
        setQuestionPreview(RenderQuestionPrint(questions.question, null, null))
        // await makeQuestionPdf(userInfo, questions);
        // await makeSurveyPdf(userInfo, survey)
    }

    return (
        <div className='mx-auto m-8 space-y-8'>
           <div className='flex justify-center'>
                <DeleteConfirmDialog msg={dialogMsg}
                    isOpen={isDialogOpen}
                    onCancel={() => setIsDialogOpen(false)}
                    onConfirm={dialogOnDeleteFn} />
            </div>
            <div id="managingTestResult"
                className="flex flex-col">
                <p className='font-bold'>시험 결과 리스트</p>
                {titles && titles.map((title, idx) => {
                    return (
                        <div className='flex flex-row space-x-4'
                            key={title + '_' + idx + 'div'}>
                            <button key={title + '_' + 'delBtn'}
                                onClick={() => { handleRemoveTitle(title) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                            <button key={title + '_' + idx}
                                onClick={() => { handleTitleClick(title) }}>
                                {title}
                            </button>
                        </div>
                    )
                })}
            </div>
            {testResult && (
                <div id='testResultTable'
                    className='space-y-4'>
                    <table className='table-auto  border border-gray-600'>
                        <thead className='border border-gray-600'>
                            <tr>
                                <th className='border border-gray-600'> 삭제 </th>
                                <th className='border border-gray-600'> 이름 </th>
                                <th className='border border-gray-600'> 교번 </th>
                                <th className='border border-gray-600'> 소속 </th>
                                <th className='border border-gray-600'> 시험 결과 </th>
                                <th className='border border-gray-600'> 시험지 제출 </th>
                                <th className='border border-gray-600'> 설문지 제출 </th>
                                <th className='border border-gray-600'> 다운로드 </th>
                            </tr>
                        </thead>
                        <tbody className='border border-gray-600'>
                            {testResult.userResult.length > 0 && testResult.userResult.map(({ userInfo, questionCnt, resultQuestion, surveyResult }, idx) => (
                                <tr className='text-center'
                                    key={idx + '__' + userInfo.userName + '_' + userInfo.userId + '_' + userInfo.userAffiliation}>

                                    <td className='border border-gray-600'
                                        key={idx + '_del_' + userInfo.userName}>
                                        <button key={idx + 'delBtn'}
                                            onClick={() => { handleRemoveUserInfo(selectedTitle, userInfo) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                            </svg>
                                        </button>
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_userName_' + userInfo.userName}>
                                        {userInfo.userName}
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_userId_' + userInfo.userId}>
                                        {userInfo.userId}
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_userAffiliation' + userInfo.userAffiliation}>
                                        {userInfo.userAffiliation}
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_' + resultQuestion.question.length}>
                                        {resultQuestion.question.length}
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_' + "endTime"}>
                                        {userInfo.testEndTime === undefined ? '미제출 ' : '제출'}
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_' + "survey"}>
                                        {userInfo.surveyEndTime === undefined ? '미제출 ' : '제출'}
                                    </td>
                                    <td className='border border-gray-600 px-4'>
                                        <button >
                                            <svg onClick={() => makeDocs(userInfo, surveyResult, resultQuestion, questionPreviewRef)}
                                                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className='flex flex-row space-x-4'>
                        설문지 정리 다운로드
                        <button>
                            <svg onClick={() => makeSurveyResult(testResult.userResult.map(item => item.surveyResult))} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                            </svg>
                        </button>
                    </div>

                    <div id='questionPdf'
                        // style={{ position: 'absolute', left: '-9999px' }}
                        ref={questionRef}>
                        {questionPreview}
                    </div>
                </div >)
            }
        </div >);
}