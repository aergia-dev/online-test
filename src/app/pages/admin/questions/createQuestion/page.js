'use client'
import { useRef } from 'react';

function previewSingleQuestion(content) {
    return (
        <div>
            <p>{content["question"]}</p>
            <ul>
                {content["selection"].map((itm) => {
                    <li>
                        item
                    </li>
                })}
            </ul>
        </div>
    );
}

//todo: remove it
const separator = "__";

function makeQuestion(content) {
    console.log("cont: ", content);

    const splited = content.split(separator);
    // remove num
    const question = splited[0].replace("\d+\.", "");
    splited.splice(0, 1);

    const selection = splited.map((itm, idx) => { return { idx: idx, item: itm }; });


    const fmt = {
        uuid: crypto.randomUUID(),
        question: question,
        selection: [
            selection,
        ],
        answer: ""
    };
    return fmt;
}

function parsing(content) {
    const trimed = content.trim();
    const splited = trimed.split("\n");
    console.log(splited);
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

    console.log(questionStr);
    const makeQuestionFn = makeQuestion.bind(separator);
    const question = questionStr.map(makeQuestionFn);
    console.log(question);

    return question;


}

function makePreview(content, ref) {

    //split by empty line
    // first ele is question
    // second
    //split with eol
    //it is selection
    const question = parsing(content);

    // document.getElementById("questionPreview").innerHTML = question.map(previewSingleQuestion);
    ref.current = "asdfsadf"; // question.map(previewSingleQuestion);

}

export default function CreateQuestion() {
    const ref = useRef(null);
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-center">
                <button type="button"
                    className="bg-blue-600 text-white"
                    onClick={() => makePreview(document.getElementById("rawQuestion").value, ref)}>
                    converting
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
                        <div id="questionPreview"
                            ref={ref}>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}