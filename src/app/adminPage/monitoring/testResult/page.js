'use client'
import { getAllTestResultTilesDb, getAllTestResultDb } from "@/lib/db"
import { useRef, useState, useEffect } from "react"
import ReactPDF from "@react-pdf/renderer";
import NewWindow from "react-new-window";
// import { makeQuestionPdf, makeSurveyPdf } from "./makePdf";
import html2canvas from "html2canvas";
import { MakeQuestionPreview2, makeQuestionPreview } from "./makePdf";
import jsPDF from "jspdf";
import makeSurveyResult from "./makeSurveyResult/makeSurveyResult";


export default function TestResult() {
    const [titles, setTitles] = useState();
    const [selectedTitle, setSelectedTitle] = useState();
    const [isDropdownOpened, setIsDropdownOpened] = useState();
    const [testResult, setTestResult] = useState();
    const questionPdf = useRef();
    const [questionPreview, setQuestionPreview] = useState(null);
    //     {testResult: 
    //         {title: '',
    //     starTime: 'time',
    // userResult: []}


    //     function makeQuestionPdf(userInfo, questions, answer) {
    //         const qp = makeQuestionPreview(userInfo, questions.question, answer);
    //         setQuestionPreview(qp);
    //         // document.body.appendChild(r);
    //    }


    useEffect(() => {
        const readTitles = async () => {
            const readTitles = await getAllTestResultTilesDb();
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
			doc.addImage(imgData, 'PNG', 0, position, imgWidth / 5, imgHeight /5);
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

    const readTestResultByTitle = async (title) => {
        return await getAllTestResultDb(title);
    }
    const handleOptionClick = async (title) => {
        setSelectedTitle(title);
        setIsDropdownOpened(!isDropdownOpened)
        if (title) {
            const testResult = await getAllTestResultDb(title);
            setTestResult(testResult);
            console.log("rrrr", testResult);
        }
    }

    const makeQuestionPdf = (userInfo, questions, answer) => {
        const qeustionPdf = makeQuestionPreview(userInfo, questions.question, answer);
        setQuestionPreview(qeustionPdf);
    }


   //dropdown menu of  test tile
    //show in editable table of testResult.json
    // make question. file as pdf 
    // make survey. file as pdf
    // make total result. file as excel

    return (
        <div className='mx-auto m-8'>
            <div className='flex flex-row justify-between m-4'>
                <div className="relative inline-block text-left">
                    <div className=''>
                        <button type="button"
                            className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            id="menu-button"
                            aria-expanded="true"
                            aria-haspopup="true"
                            onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
                            {selectedTitle ? selectedTitle : 'choose'}
                            <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    {isDropdownOpened && (
                        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                            <div className="py-1" role="none">
                                {titles && titles.map((test) => (
                                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm"
                                        role="menuitem"
                                        tabIndex="-1"
                                        id={"menu" + test}
                                        key={"menu" + test}
                                        onClick={() => handleOptionClick(test)} >
                                        {test}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}

                </div>
                <div className=''>
                    <button type='button'
                        // onClick={() => makeReuslt(userInfo, question, survey, answer, document.getElementById('image'))}>
                        onClick={() => makeSurveyResult(testResult.userResult.map(item => item.surveyResult))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                        </svg>
                    </button>

                </div>
            </div>
            {testResult && (
                <div id='testResultTable'>
                    <table className='table-auto  border border-gray-600'>
                        <thead className='border border-gray-600'>
                            <tr>
                                <th className='border border-gray-600'> name </th>
                                <th className='border border-gray-600'> id </th>
                                <th className='border border-gray-600'> affiliation </th>
                                <th className='border border-gray-600'> selected cnt </th>
                                <th className='border border-gray-600'> end? </th>
                                <th className='border border-gray-600'> download question/survey </th>
                            </tr>
                        </thead>
                        <tbody className='border border-gray-600'>
                            {testResult.userResult.length > 0 && testResult.userResult.map(({ userInfo, question, questionCtn, resultQuestion, surveyResult}, idx) => (
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
                                        {userInfo.endTime === undefined ? 'not ' : 'done'}
                                    </td>
                                    <td className='border border-gray-600' >
                                        <button type='button'
                                            onClick={() => makeQuestionPdf(userInfo, question, answer)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                        </button>
                                        <button type='button'
                                            onClick={() => makeSurveyPdf(userInfo, survey, answer)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div id='questionPdf'
                        style={{ position: 'absolute', left: '-9999px' }}
                        ref={questionPdf}>
                        {questionPreview}
                    </div>
                </div>)}
        </div>);
}