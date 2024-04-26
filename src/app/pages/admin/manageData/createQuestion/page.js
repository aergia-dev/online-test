'use client'
import { useRef, useState } from 'react';
import { insertQuestion } from '@/component/db';


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
                        <div className="flex flex-row">
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

const testData = " \n\
2. 항해용 간행물에 포함되지 않는 것은? \n\
 ① 항해용 해도, 전자해도\n\
 ② 조석표, 등대표, 항로지 등을 포함하는 항해서지\n\
 ③ 항해용 간행물의 변경이 필요한 사항 등으로 포함하는 항행통보\n\
 ④ 항해 이외의 ㅣ목적으로 제작한 해양 정보 간행물\n\
\n\
2. 국제수로기(IHO) 기준에 따라 해도에 표기되는 기호와 약어를 수록한 책자를 무엇이라고 하는가? \n\
 ① 해도도식 \n\
 ② 국제신호서 \n\
 ③ 항해용 간행물 목록 \n\
 ④ 해도국제표준 \n\
\n\
3. 다은 중에서 해도의 특성과 거리가 먼 것은?\n\
 ① 단순화\n\
 ② 갱신화\n\
 ③ 복잡성\n\
 ④ 국제화\n\
\n\
4. 해도의 목적과 관련이 적은 것은? \n\
 ① 항해자와 정보 소통 역할 \n\
 ② 위치 결정 작업 도구 역할 \n\
 ③ 자동 운항 백업 역할  \n\
 ④ 법적 문서 역할 \n";



export default function CreateQuestion() {
    const ref = useRef(null);
    const [preview, setPreview] = useState("null");
    const [rawQuestion, setRawQuestion] = useState("null");

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-center space-x-4">
                <button type="button"
                    className="bg-blue-600 text-white"
                    onClick={() => makePreview(document.getElementById("rawQuestion").value, setPreview, setRawQuestion)}>
                    converting
                </button>
                <button type="button"
                    className="bg-blue-600 text-white"
                    onClick={() => insertQuestion('expert', rawQuestion)}>
                    save
                </button>
            </div>
            <div>
                <div className="flex w-full">
                    <div className="w-1/2"
                        name="left-half">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea id="rawQuestion" rows="20" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                        defaultValue={testData}>

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