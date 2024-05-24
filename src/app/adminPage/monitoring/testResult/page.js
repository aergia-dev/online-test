'use client'
import { getAllTestResultTitlesDb, getAllTestResultDb, deleteTitleDb } from "@/lib/db"
import { useRef, useState, useEffect } from "react"
import ReactPDF from "@react-pdf/renderer";
import NewWindow from "react-new-window";
import html2canvas from "html2canvas";
import { MakeQuestionPreview2, makeQuestionPreview } from "./makePdf";
import jsPDF from "jspdf";
import makeSurveyResult from "./makeSurveyResult/makeSurveyResult";


//     {testResult: 
//         {title: '',
//     starTime: 'time',
// userResult: []}

export default function TestResult() {
    const [titles, setTitles] = useState();
    const [selectedTitle, setSelectedTitle] = useState();
    const [isDropdownOpened, setIsDropdownOpened] = useState();
    const [testResult, setTestResult] = useState();
    const questionPdf = useRef();
    const [questionPreview, setQuestionPreview] = useState(null);
    useEffect(() => {
        const readTitles = async () => {
            const readTitles = await getAllTestResultTitlesDb();
            setTitles(readTitles);
            console.log('readTitles', readTitles);
        }

        readTitles();
    }, []);

    useEffect(() => {
        if (questionPreview !== null) {
            var doc = new jsPDF('p', 'mm', 'a4');
            const rr = questionPreview;
            console.log("rr", rr);

            function canvasToPdf(canvas) {

                var imgData = canvas.toDataURL('image/png');

                var imgWidth = doc.internal.pageSize.getWidth();
                var pageHeight = doc.internal.pageSize.getHeight();  // 출력 페이지 세로 길이 계산 A4 기준
                var imgHeight = canvas.height * imgWidth / canvas.width;
                var heightLeft = imgHeight;

                var position = 0;

                // 첫 페이지 출력
                doc.addImage(imgData, 'PNG', 0, position, imgWidth / 5, imgHeight / 5);
                heightLeft -= pageHeight;

                // 한 페이지 이상일 경우 루프 돌면서 출력
                while (heightLeft >= 20) {
                    position = heightLeft - imgHeight;
                    doc.addPage();
                    doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }


                // const doc = new jsPDF('p', 'mm', 'a4');
                // const imgWidth = 210;
                // const pageHeight = 295;
                // let position = 0;
                // const imgHeight = canvas.height * imgWidth / canvas.width;
                // let heightLeft = imgHeight;
                // const imgData = canvas.toDataURL('image/jpeg');
                // doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                // heightLeft -= pageHeight;
                // while (heightLeft >= 0) {
                //     position = heightLeft - imgHeight;
                //     doc.addPage();
                //     doc.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
                //     heightLeft -= pageHeight;
                // }
                doc.save('example.pdf');
            }

            const ele = document.getElementById('questionPdf');
            html2canvas(ele).then(canvas => {
                canvasToPdf(canvas);
            })
        }
    }, [questionPreview]);

    // const readTestResultByTitle = async (title) => {
    //     return await getAllTestResultDb(title);
    // }

    const handleTitleClick = async (title) => {
        setSelectedTitle(title);
        setIsDropdownOpened(!isDropdownOpened)
        if (title) {
            const testResult = await getAllTestResultDb(title);
            setTestResult(testResult);
            console.log("rrrr", testResult);
        }
    }

    const handleRemoveTtile = async (title) => {
        await deleteTitleDb(title);
        const newTitle = titles.filter(v => v !== title);
        setSelectedTitle([...newTitle]);
    }

    const makeQuestionPdf = (userInfo, questions, answer) => {
        const qeustionPdf = makeQuestionPreview(userInfo, questions.question, answer);
        setQuestionPreview(qeustionPdf);
    }


    const makeDocs = (survey, question) =>  {

    }
    //dropdown menu of  test tile
    //show in editable table of testResult.json
    // make question. file as pdf 
    // make survey. file as pdf
    // make total result. file as excel

    return (
        <div className='mx-auto m-8 space-y-8'>
            <div id="managingTestResult"
                className="flex flex-col">
                <p className='font-bold'>시험 결과 리스트</p>
                {titles && titles.map(title => {
                    return (
                        <div className='flex flex-row space-x-4'
                            key={title + 'div'}>
                            <button key={title + 'delBtn'}
                                onClick={() => { handleRemoveTtile(title) }}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                </svg>
                            </button>
                            <p key={title}
                                onClick={() => { handleTitleClick(title) }}>{title}
                            </p>
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
                            {testResult.userResult.length > 0 && testResult.userResult.map(({ userInfo, question, questionCtn, resultQuestion, surveyResult }, idx) => (
                                <tr className='text-center'
                                    key={idx + '_' + userInfo.userName + '_' + userInfo.userId + '_' + userInfo.userAffiliation}>
                                    <td className='border border-gray-600'
                                        key={idx + '_' + userInfo.userName}>
                                        {userInfo.userName}
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_' + userInfo.userId}>
                                        {userInfo.userId}
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_' + userInfo.userAffiliation}>
                                        {userInfo.userAffiliation}
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_' + resultQuestion.question.length}>
                                        {resultQuestion.question.length}
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_' + "endTime"}>
                                        {userInfo.endTime === undefined ? '미제출 ' : '제출'}
                                    </td>
                                    <td className='border border-gray-600'
                                        key={idx + '_' + "survey"}>
                                        {surveyResult === undefined ? '미제출 ' : '제출'}
                                    </td>
                                    <td className='border border-gray-600 px-4'>
                                        <button >
                                            <svg onClick={() => makeDocs(surveyResult, resultQuestion)} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
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
                        style={{ position: 'absolute', left: '-9999px' }}
                        ref={questionPdf}>
                        {questionPreview}
                    </div>
                </div >)
            }
        </div >);
}