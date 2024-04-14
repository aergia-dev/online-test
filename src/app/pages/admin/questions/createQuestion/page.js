'use client'
import { useRef, useState } from 'react';

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


function makePreview(content, setPreview) {
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
        console.log("question:", Aquestion);
        console.log("answerIdx:", answerIdx);
        console.log("value:", value);
        const changedQ = Aquestion;
        changedQ["answer"] = value ? answerIdx : 'none';
        const changedQuestion = question.map((q) => { return replaceQuestion(q, changedQ) });
        console.log("changedQuestion:", changedQuestion);

        setPreview(previewQuestion(changedQuestion, changeAnswer));
    };

    localStorage.setItem("questions", question);
    setPreview(previewQuestion(question, changeAnswer));
    console.log("end:", question);
}

export default function CreateQuestion() {
    const ref = useRef(null);
    const [preview, setPreview] = useState("null");

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-center space-x-4">
                <button type="button"
                    className="bg-blue-600 text-white"
                    onClick={() => makePreview(document.getElementById("rawQuestion").value, setPreview)}>
                    converting
                </button>
                <button type="button"
                    className="bg-blue-600 text-white"
                    onClick={() => makePreview(document.getElementById("rawQuestion").value, setPreview)}>
                    save
                </button>
            </div>
            <div>
                <div className="flex w-full">
                    <div className="w-1/2"
                        name="left-half">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea id="rawQuestion" rows="20" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>
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