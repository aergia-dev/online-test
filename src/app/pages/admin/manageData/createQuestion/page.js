'use client'
import { useRef, useState, useEffect } from 'react';
import { insertQuestion } from '@/component/db';
import { getLevelDb } from '@/component/db';


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

    return (
        <div key={Qkey}>
            <p>Q. {question["question"]}</p>
            <p>S.  </p>
            <ul key={Ulkey}>
                {question["selection"].map(({ idx, item }) => {
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
    const preview = content.map((q) => { return previewSingleQuestion(q, changeAnswerFn) });
    return (
        <div>
            {preview}
        </div>
    )
}

//todo: remove it
const separator = "__";

function makeQuestion(content) {
    const splited = content.split(separator);
    const from1to10InCircle = /^\s*[\u{2460}-\u{2469}]\s*/u;
    const regexResult = splited.map((x) => {
        return {
            matchedCnt: from1to10InCircle.exec(x),
            str: x
        }
    });

    console.log(regexResult);
    let question = new String();
    let selection = new Array();

    regexResult.map(({ matchedCnt, str }) => {
        if (matchedCnt === null) {
            question += str.replace(/\s*\d+\.\s*/, "");
        }
        else {
            selection.push(str.trim().replace(from1to10InCircle, ""));
        }
    });

    const idxSelection = selection.map((itm, idx) => { return { idx: idx + 1, item: itm }; });

    const fmt = {
        uuid: crypto.randomUUID(),
        question: question,
        selection: [
            ...idxSelection,
        ],
        answer: 'none', //has selction index
    };

    return fmt;
}

function parsing(content) {
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

    const makeQuestionFn = makeQuestion.bind(separator);
    const question = questionStr.map(makeQuestionFn);

    return question;
}


function makePreview(content, setPreview, setRawQuestion) {
    const question = parsing(content);
    const replaceQuestion = (oldItm, newItm) => {
        console.log("replaceQuestion: ", oldItm);
        if (oldItm.uuid === newItm.uuid) {
            return newItm;
        }
        else {
            return oldItm;
        }
    };

    const changeAnswer = (Aquestion, answerIdx, value) => {
        const changedQ = Aquestion;
        changedQ["answer"] = value ? answerIdx : 'none';
        const changedQuestion = question.map((q) => { return replaceQuestion(q, changedQ) });
        console.log("changedQuestion:", changedQuestion);
        // localStorage.setItem("questions", changedQuestion);
        // const d = localStorage.getItem('questions');
        // console.log("read localstorage: ", d);
        setRawQuestion(changedQuestion);
        setPreview(previewQuestion(changedQuestion, changeAnswer));
    };

    // localStorage.setItem("questions", question);

    setRawQuestion(question);
    setPreview(previewQuestion(question, changeAnswer));
}

export default function CreateQuestion() {
    const ref = useRef(null);
    const [preview, setPreview] = useState("null");
    const [rawQuestion, setRawQuestion] = useState("null");
    const [levels, setLevels] = useState();
    const [isDropdownOpened, setIsDropdownOpened] = useState();
    const [selectedOption, setSelectedOption] = useState();

    const handleOptionClick = (selectedLevel) => {
        setSelectedOption(selectedLevel);
        setIsDropdownOpened(false);
    }

    useEffect(() => {
        const readQuestinoLevels = async () => {
            const level = await getLevelDb();
            console.log('levels ', level);
            setLevels(level);
        }
        readQuestinoLevels();
    }, [])

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
                                {selectedOption ? selectedOption['desc'] : "시험 등급 선택"}
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
                        className="bg-blue-600 text-white rounded-full  px-4 py-1"
                        onClick={() => makePreview(document.getElementById("rawQuestion").value, setPreview, setRawQuestion)}>
                        변환
                    </button>
                    <button type="button"
                        className="bg-blue-600 text-white rounded-full px-4 py-1"
                        onClick={() => insertQuestion('expert', rawQuestion)}>
                        저장
                    </button>
                </div>
            </div>
            <div>
                <div className="flex w-full">
                    <div className="w-1/2"
                        name="left-half">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">문제 입력</label>
                        <textarea id="rawQuestion" rows="20" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                        // defaultValue={testData}
                        >

                        </textarea>
                    </div>
                    <div name="right-half w-1/2">
                        <div id="questionPreview">
                            {preview}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}