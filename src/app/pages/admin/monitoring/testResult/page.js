'use client'
import { getAllTestResultTilesDb, getAllTestResultDb } from "@/component/db"
import { useRef, useState, useEffect } from "react"
import ReactPDF  from "@react-pdf/renderer";

// import { makeQuestionPdf, makeSurveyPdf } from "./makePdf";
import html2canvas from "html2canvas";
import {makeQuestionPreview2, makeQuestionPreview } from "./makePdf";
import { ReactDOM } from 'react-dom';
import jsPDF from "jspdf";


export default function TestResult() {
    const [titles, setTitles] = useState();
    const [selectedTitle, setSelectedTitle] = useState();
    const [isDropdownOpened, setIsDropdownOpened] = useState();
    const [testResult, setTestResult] = useState();
    const questionImage = useRef();
    const [questionPreview, setQuestionPreview] = useState(null);
    //     {testResult: 
    //         {title: '',
    //     starTime: 'time',
    // userResult: []}

    
    function makeQuestionPdf(userInfo, questions, answer) {
        // const qp = makeQuestionPreview(userInfo, questions.question, answer);
        // setQuestionPreview(qp);
        ReactDOM.render(makeQuestionPreview2(userInfo, questions.question, answer), document.getElementById('qeustionImage')) ;
        // document.body.appendChild(r);
   }

    useEffect(() => {
        const readTitles = async () => {
            const readTitles = await getAllTestResultTilesDb();
            setTitles(readTitles);
            console.log('readTitles', readTitles);
        }

        readTitles();
    }, []);

    // useEffect(() => {
    //   const rr = questionPreview;
    //     console.log("rr", rr);
    //     if(rr !== null)
    //         {
    //     console.log('qp', rr)
    //     html2canvas(questionImage.current).then(canvas => {
    //         const doc = new jsPDF('p', 'mm', 'a4');
    //         const imgData = canvas.toDataURL('image/jpeg');
    //         // console.log("!@#", imgData);

    //         let width = 210;
    //         let height = 295;
    //         doc.addImage(imgData, 'JPEG', 0, 0);

    //         doc.save('example.pdf');
    //     })
    //         }
   
    // }, [questionPreview]);

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

    const makeDocs = (userInfo, question, survey, answer, element) => {

        console.log(question);
        console.log("makeDocs", makeDocs);
        const questionDocName = makeQuestionPdf(userInfo, question, answer, element);
        // const surveyDocName = makeSurveyPdf(userInfo, survey);

    }
    //dropdown menu of  test tile
    //show in editable table of testResult.json
    // make question. file as pdf 
    // make survey. file as pdf
    // make total result. file as excel

    return (
        <div className='mx-auto'>
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
            <div id='testResultTable'>
                <table className='table-auto'>
                    <thead>
                        <tr>
                            <th> name </th>
                            <th> id </th>
                            <th> affiliation </th>
                            <th> selected cnt </th>
                            <th> end? </th>
                            <th> download question/survey </th>
                        </tr>
                    </thead>
                    <tbody>
                        {testResult && testResult.userResult.length > 0 && testResult.userResult.map(({ userInfo, answer, question, survey, endTime }, idx) => (
                            <tr className='text-center'
                                key={idx + '_' + userInfo.userName + '_' + userInfo.userId + '_' + userInfo.userAffiliation}>
                                <td key={idx + '_' + userInfo.userName}>
                                    {userInfo.userName}
                                </td>
                                <td key={idx + '_' + userInfo.userId}>
                                    {userInfo.userId}
                                </td>
                                <td key={idx + '_' + userInfo.userAffiliation}>
                                    {userInfo.userAffiliation}
                                </td>
                                <td key={idx + '_' + answer.length}>
                                    {answer.length}
                                </td>
                                <td key={idx + '_' + "endTime"}>
                                    {endTime === undefined ? 'not ' : 'done'}
                                </td>
                                <td>
                                    <button type='button'
                                        onClick={() => makeDocs(userInfo, question, survey, answer, document.getElementById('image'))}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div id='qeustionImage'
                    ref={questionImage}>
                    {questionPreview}
                </div>
            </div>
        </div>);
}