'use client'
import { useRef, useState, useEffect, Fragment } from 'react';
import { insertQuestionDb } from '@/lib/db';
import { getLevelDb } from '@/lib/db';
import Image from 'next/image';
import { renderQuestionWithAnswer } from '@/app/common/renderQuestion';


function previewSingleQuestion(question, changeAnswerFn) {
    const Qkey = question["question"];
    const Akey = question["question"] + "-A";
    const Ulkey = question["question"] + "-UL";
    const answer = question["answer"];


    const checkboxOnChange = (q, idx, value) => {
        console.log("changed data", q);
        console.log("idx", idx, " val:", value);
        changeAnswerFn(q, idx, value);
    };

    console.log('previewSingleQuestion', question)
    return (
        <div key={Qkey}>
            <p>Q. {question.Qtext}</p>
            <p>S.  </p>
            <ul key={Ulkey}>
                {question.Qselection.map(({ idx, item }) => {
                    const Skey = Qkey + "-" + idx;
                    const Ckey = Qkey + "-" + idx + "-C";
                    return (
                        <div className="flex flex-row"
                            key={Skey + Ckey}>
                            <input type="checkbox" id={Ckey} onChange={(e) => {
                                checkboxOnChange(question, idx, e.target.checked);
                            }} />
                            <li key={Skey} className=""> {idx}_  {item} </li>
                        </div>);
                })}

                <p id={Akey} key={Akey}>A. {question["answer"]}</p>
            </ul>
            <br />
        </div>
    );
}

function previewQuestion(content, changeAnswerFn) {
    return (
        <div>
            {renderQuestionWithAnswer(content, null, null, null)}
        </div>
    )
}

//todo: remove it
const separator = "__";

function makeQuestion(content) {
    const splited = content.split(separator);
    const from1to10InCircle = /^\s*[\u{2460}-\u{2469}]\s*/u; //number inside circle
    const regexResult = splited.map((x) => {
        return {
            matchedCnt: from1to10InCircle.exec(x),
            str: x
        }
    });

    console.log(regexResult);

    const matchedCnt = regexResult.map(item => item.matchedCnt > 0)

    let question = new String();
    let selection = new Array();
    let Qtype = '';
    let answers = []
    
    if (matchedCnt > 0) {
        // multi choice
        Qtype = 'multChoice';
        regexResult.map(({ matchedCnt, str }) => {
            if (matchedCnt === null) {
                question += str.replace(/\s*\d+\.\s*/, "");
            }
            else {
                selection.push(str.trim().replace(from1to10InCircle, ""));
            }
        });

    }
    else {
        //essay type
        const answerStr = regexResult[regexResult.length -1 ].str;
        const text = regexResult[0].str;
        answerStr.replace(/[\[\]]/, '');
        question = text;
        answers = answerStr.split(',').map((s) => s.trim());
        Qtype = 'essay';

    }

    const fmt = {
        Quuid: crypto.randomUUID(),
        Qtype: Qtype,
        Qtext: question,
        Qselection: [
            ...selection,
        ],
        Qanswer: {
            answers: answers,
            answerCnt: 0,
            userAnswer: []
        },
        Qimg: {
            content: null,
            width: null,
            height: null,
        }
    };

    console.log("fmt", fmt);
    return fmt;
}

function parsing(content, imgInfo) {
    const trimed = content.trim();
    const splited = trimed.split("\n");
    let questionStr = new Array();
    let idx = 0;

    for (let i = 0; i < splited.length; i++) {
        if (splited[i].trim() === "") {
            idx++;
        }
        else {
            if (questionStr[idx] === undefined)
                questionStr[idx] = splited[i];
            else
                questionStr[idx] = questionStr[idx] + separator + splited[i];
        }
    }

    if (questionStr.length > 1 && imgInfo.content) {
        alert("이미지가 있는 문제는 1개만 입력 가능");
        return;
    }
    const question = questionStr.map(item => makeQuestion(item));

    if (imgInfo.content) {
        question[0].Qimg = {
            content: imgInfo.content,
            width: imgInfo.width,
            height: imgInfo.height,
        }
    }

    console.log('all', question)
    return question;
}


function makePreview(content, imgInfo, setPreview, setRawQuestion) {
    const question = parsing(content, imgInfo);
    const setMultiChoiceAnswer = (Quuid, selectionIdx) => {
        //filter question
        const qIdx = question.findIndex((q) => q.Quuid === Quuid);
        const qTarget = question[qIdx];
        console.log('qTarget', qTarget);
        //set add answer
        if (qTarget.Qanswer.answers.includes(selectionIdx)) {
            //remove Qanswer.userAnwer, dec answerCnt
            qTarget.Qanswer.answers = qTarget.Qanswer.answers.filter((answer) => answer !== selectionIdx)
            qTarget.Qanswer.answerCnt -= 1;
        }
        else {
            qTarget.Qanswer.answers.push(selectionIdx);
            qTarget.Qanswer.answerCnt += 1;
        }

        console.log('after qTarget', qTarget);
        question[qIdx] = qTarget;

        const newQeustion = [...question];

        // setRawQuestion(newQeustion);

        setPreview(renderQuestionWithAnswer(newQeustion, null, setMultiChoiceAnswer, null));
    }

    setRawQuestion(question);

    //change to useeffect .
    setPreview(renderQuestionWithAnswer(question, null, setMultiChoiceAnswer, null));
}

export default function CreateQuestion() {
    const ref = useRef(null);
    const [preview, setPreview] = useState("null");
    const [rawQuestion, setRawQuestion] = useState("null");
    const [levels, setLevels] = useState();
    const [isDropdownOpened, setIsDropdownOpened] = useState();
    const [selectedLevel, setSelectedLevel] = useState(null);

    const [image, setImage] = useState(null);
    const [imageWidth, setImageWidth] = useState(300);
    const [imageHeight, setImageHeight] = useState(200);

    const handleOptionClick = (selectedLevel) => {
        setSelectedLevel(selectedLevel);
        setIsDropdownOpened(false);
    }

    const readImg = (event) => {
        const file = event.target.files[0]; // 사용자가 선택한 파일

        // console.log("file", file)
        if (file) {
            const reader = new FileReader(); // FileReader 객체 생성
            reader.onload = function (e) {
                setImage(reader.result);
            };
            reader.readAsDataURL(file); // 파일을 Data URL로 읽기
        }
    }
    const changeImage = (item, value) => {
        if (value === '')
            value = 0;

        if (item === 'width')
            setImageWidth(value);
        else
            setImageHeight(value);
    }

    useEffect(() => {
        const readQuestinoLevels = async () => {
            const level = await getLevelDb();
            console.log('levels ', level);
            setLevels(level);
        }
        readQuestinoLevels();
    }, [])

    const insertQuestion = async (selectedLevel, Q) => {
        if (selectedLevel) {
            await insertQuestionDb(selectedLevel.level, Q)
            alert("저장 완료");
        }
        else {
            alert("등급 선택 필요");
        }
    }

    const ImageComponent = () => {
        return (<div>
            {image ?
                <div className='flex flex-row'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" onClick={() => setImage(null)}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                    <Image src={image}
                        width={imageWidth}
                        height={imageHeight}
                        className='m-4'
                        alt='images' />
                </div>
                :
                <Fragment>
                    <div className='flex flex-col'>
                        <label>image 첨부시에는 한 문제만 입력 가능</label>
                    </div>
                    <input type="file" name="image" className="w-96 p-4"
                        onChange={readImg} />
                    <label > width </label>
                    <input className='border' id='width' type='text' onChange={(e) => changeImage('width', e.target.value)} value={imageWidth} />
                    <label > height </label>
                    <input className='border' id='height' type='text' onChange={(e) => changeImage('height', e.target.value)} value={imageHeight} />
                </Fragment>
            }

            <textarea id="rawQuestion" rows="20" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="with image Write your thoughts here..." >
            </textarea>
        </div>)
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex space-x-4 space-y-4 px-10 py-4 justify-center items-stretch">
                <div className="flex space-x-4">
                    <div className="relative inline-block text-center">
                        <div>
                            <button type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
                                {selectedLevel ? selectedLevel['desc'] : "시험 등급 선택"}
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {isDropdownOpened && (
                            <div className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    {levels && levels.map((levels, idx) => (
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
                    <button type="button"
                        className="bg-blue-597 text-white rounded-full  px-4 py-1"
                        onClick={() => makePreview(document.getElementById("rawQuestion").value, {
                            content: image, width: imageWidth, height
                                : imageHeight
                        }, setPreview, setRawQuestion)}>
                        변환
                    </button>
                    <button type="button"
                        className="bg-blue-600 text-white rounded-full px-4 py-1"
                        onClick={() => insertQuestion(selectedLevel, rawQuestion)}>
                        저장
                    </button>
                </div>
            </div>
            <div>
                <div className="flex w-full">
                    <div className="w-1/2"
                        name="left-half">
                        <ImageComponent />
                    </div>
                    <div name="right-half w-1/2">
                        <div id="questionPreview">
                            {preview}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );

}