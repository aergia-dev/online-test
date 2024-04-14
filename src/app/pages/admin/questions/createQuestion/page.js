'use client'
import { useRef, useState } from 'react';

function previewSingleQuestion(content) {
    //todo if checked selection then text color changed.  
    
    return (
        <div key={content["question"]}>
            <p>Q. {content["question"]}</p>
            <p>S.  </p>
            <ul>
                {content["selection"].map(({ idx, item }) => {
                    const k = content["question"] + "-" +idx;
                    return (
                        <div className="flex flex-row">
                            <input type="checkbox" id={k}/>
                            <li key={k}> {item} </li>
                        </div>);
                })}
            </ul>
        </div>
    );
}

function previewQuestion(content) {
    const preview = content.map(previewSingleQuestion);
    console.log("preview", preview);
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

    const idxSelection = selection.map((itm, idx) => { return { idx: idx, item: itm }; });

    const fmt = {
        uuid: crypto.randomUUID(),
        question: question,
        selection: [
            ...idxSelection,
        ],
        answer: ""
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

function makePreview(content, setContent) {
    const question = parsing(content);
    setContent(previewQuestion(question));
}

export default function CreateQuestion() {
    const ref = useRef(null);
    const [content, setContent] = useState("null");

    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-center space-x-4">
                <button type="button"
                    className="bg-blue-600 text-white"
                    onClick={() => makePreview(document.getElementById("rawQuestion").value, setContent)}>
                    converting
                </button>
              <button type="button"
                    className="bg-blue-600 text-white"
                    onClick={() => makePreview(document.getElementById("rawQuestion").value, setContent)}>
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
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}