'use client'

import { useEffect, useState } from "react";
import toJson from './toJson';
import { dumData } from './dummy';
import { Saira_Extra_Condensed } from "next/font/google";
import { setSurveyDB, getSurveyDb } from "@/component/db"
import SurveyPreview from "@/component/surveyPreview";

export default function Survey() {
    const [preview, setPreview] = useState();
    const [title, setTitle] = useState();
    const [head, setHead] = useState();
    const [item1, setItem1] = useState();
    const [item1Row, setItem1Row] = useState();
    const [item2Desc, setItem2Desc] = useState();
    const [item2Col, setItem2Col] = useState();
    const [item2Row, setItem2Row] = useState();
    const [item3Desc, setItem3Desc] = useState();
    const [item3Col, setItem3Col] = useState();
    const [item3Row, setItem3Row] = useState();
    const [item4Desc, setItem4Desc] = useState();
    const [wholeContent, setWholeContent] = useState();

    const makePreview = () => {
        const contents = {
            title: title,
            head: head,
            item1: item1,
            item1Row: item1Row,
            item2Desc: item2Desc,
            item2Col: item2Col,
            item2Row: item2Row,
            item3Desc: item3Desc,
            item3Col: item3Col,
            item3Row: item3Row,
            item4Desc: item4Desc
        };

        const contentsJson = toJson(contents);
        setWholeContent(contentsJson);
        console.log("contentsJson", JSON.stringify(contentsJson));
        // const newPreview = makeSurvey(contentsJson);
        const newPreview = SurveyPreview(contentsJson);
        setPreview(newPreview);

    };

    useEffect(() => {
        // const readSurvey = async () => {
        //     const survey = await getSurveyDb();
        //     console.log("survey", survey);
        //     setTitle(survey.title);
        //     setHead(survey.head);
        //     setItem1Row(survey.item1Row);
        //     setItem1(survey.item1);
        //     setItem2Desc(survey.item2Desc);
        //     setItem2Col(survey.item2Col);
        //     setItem2Row(survey.item2Row);
        //     setItem3Desc(survey.item3Desc)
        //     setItem3Col(survey.item3Col);
        //     setItem3Row(survey.item3Row);
        //     setItem4Desc(survey.item4Desc);
        // }

        setTitle(dumData.title);
        setHead(dumData.head);
        setItem1Row(dumData.item1Row);
        setItem1(dumData.item1);
        setItem2Desc(dumData.item2Desc);
        setItem2Col(dumData.item2Col);
        setItem2Row(dumData.item2Row);
        setItem3Desc(dumData.item3Desc)
        setItem3Col(dumData.item3Col);
        setItem3Row(dumData.item3Row);
        setItem4Desc(dumData.item4Desc);

        // readSurvey();
        //temp
        // makePreview();
    }, []);

    const save = async () => {
        await setSurveyDB(wholeContent);
    }
    return (
        <div className="flex flex-col w-full">
            <div className="flex justify-center space-x-4">
                <button type="button"
                    className="bg-blue-600 text-white"
                    onClick={() => save()}>
                    save
                </button>
                <button type="button"
                    className="bg-blue-600 text-white"
                    onClick={() => makePreview()}>
                    test
                </button>
            </div>
            <div>
                <div className="flex w-full">
                    <div className="w-1/2"
                        name="left-half">
                        <textarea id="title" rows="1" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                            defaultValue={title}>
                        </textarea>
                        <textarea id="head" rows="3" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                            defaultValue={head}>
                        </textarea>
                        <textarea id="item1" rows="8" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                            defaultValue={item1}>
                        </textarea>
                        <textarea id="item2Desc" rows="1" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                            defaultValue={item2Desc} >
                        </textarea>
                        <textarea id="item2Col" rows="1" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                            defaultValue={item2Col} >
                        </textarea>
                        <textarea id="item2Row" rows="35" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                            defaultValue={item2Row} >
                        </textarea>
                        <textarea id="item3Desc" rows="1" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                            defaultValue={item3Desc} >
                        </textarea>
                        <textarea id="item3Col" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                            defaultValue={item3Col} >
                        </textarea>
                        <textarea id="item3Row" rows="10" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                            defaultValue={item3Row} >
                        </textarea>
                        <textarea id="item4Desc" rows="1" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."
                            defaultValue={item4Desc} >
                        </textarea>
                    </div>


                    <div name="right-half w-1/2">
                        <div id="surveyPreview">
                            {preview}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}