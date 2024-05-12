'use client'

import SurveyPriview from "@/component/surveyPreview";
import { useState, useEffect, Link } from "react";
import { getSurveyDb, setSurveyResultDb } from '@/component/db'
import { getSession } from "@/app/login/action";

export default function Survey() {
    const [surveyForm, setSurveyForm] = useState(null);
    const [fin, setFin] = useState(false);

    const onAction = ({ key, rowIdx, colIdx, choiceIdx, uuid }) => {
        console.log("onAction", key, rowIdx, colIdx, choiceIdx, uuid);
        const newSurveyForm = { ...surveyForm };
        const foundIdx = newSurveyForm[key].findIndex((item) => item['uuid'] === uuid);
        newSurveyForm[key][foundIdx].answer = choiceIdx + 1;
        setSurveyForm(newSurveyForm);
    }

    const onActionItem2 = ({ key, rowIdx, colIdx, choiceIdx, uuid }) => {
        // console.log("onActionItem2", key, rowIdx, colIdx, choiceIdx, uuid);
        const newSurveyForm = { ...surveyForm };
        const foundIdx = newSurveyForm[key][rowIdx]['secondRow'].findIndex((item) => item.uuid === uuid);
        // console.log('found', newSurveyForm[key][rowIdx]['secondRow'][foundIdx]);
        newSurveyForm[key][rowIdx]['secondRow'][foundIdx].choice = choiceIdx + 1;
        setSurveyForm(newSurveyForm);
        // console.log('found', newSurveyForm[key][rowIdx]['secondRow'][foundIdx]);
    }

    const onActionItem3 = ({ key, rowIdx, colIdx, choiceIdx, uuid }) => {
        // console.log("onActionItem3", key, rowIdx, colIdx, choiceIdx, uuid);
        const newSurveyForm = { ...surveyForm };
        const foundIdx = newSurveyForm[key].findIndex((item) => item['uuid'] === uuid);
        // console.log("found idx", foundIdx);
        newSurveyForm[key][foundIdx].choice[colIdx] = choiceIdx + 1;
        setSurveyForm(newSurveyForm);
    }

    const onActionItem4 = ({ key, text }) => {
        const newSurveyForm = { ...surveyForm };
        // console.log("onActionItem4", key, text);
        newSurveyForm[key]['text'] = text;
        setSurveyForm(newSurveyForm);
    }

    const validation = (surveyForm) => {
        return true;
    }

    const onSave = async () => {
        if (validation(surveyForm)) {
            const userInfo = await getSession();
            await setSurveyResultDb(userInfo, surveyForm);
            setFin(true);
        }
        else {
            alert("there is not selected item");
        }
    }

    useEffect(() => {
        const updateInitVal = async () => {
            const survey = await getSurveyDb();
            console.log("####", survey);
            setSurveyForm(survey);
        }

        updateInitVal();
    }, []);

    if(fin)
        return (<div> fin.. close window</div>)
    else
    return (
        <div className='m-16'>
            {surveyForm ?
                <SurveyPriview content={surveyForm}
                    onAction={onAction}
                    onActionItem2={onActionItem2}
                    onActionItem3={onActionItem3}
                    onActionItem4={onActionItem4}
                    onSave={onSave}
                />
                :
                <div> loading </div>}
        </div>
    );
}