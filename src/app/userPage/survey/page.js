'use client'

import SurveyPreview from "@/app/component/surveyPreview";
import { useState, useEffect } from "react";
import { getSurveyDb, setSurveyResultDb, getSubmitStatus } from '@/lib/db'
import { getSession } from "@/app/loginPage/action";
import { useRouter } from "next/navigation";

export default function Survey() {
    const [surveyForm, setSurveyForm] = useState(null);
    const [session, setSession] = useState(null);
    const [status, setStatus] = useState(null);
    const router = useRouter();

    const onActionItem1 = ({ key, rowIdx, colIdx, choiceIdx, uuid }) => {
        const answerIdx = choiceIdx + 1;
        const newSurveyForm = { ...surveyForm };
        const foundIdx = newSurveyForm[key].findIndex((item) => item['uuid'] === uuid);
        const existIdx = newSurveyForm[key][foundIdx].answer.findIndex(answer => answer === answerIdx);

        if (existIdx !== -1) {
            newSurveyForm[key][foundIdx].answer.splice(existIdx, 1);
        }
        else {
            newSurveyForm[key][foundIdx].answer.push(choiceIdx + 1);
        }
        setSurveyForm(newSurveyForm);
    }

    const onActionItem2 = ({ key, rowIdx, colIdx, choiceIdx, uuid }) => {
        const newSurveyForm = { ...surveyForm };
        const foundIdx = newSurveyForm[key][rowIdx]['secondRow'].findIndex((item) => item.uuid === uuid);
        newSurveyForm[key][rowIdx]['secondRow'][foundIdx].choice = choiceIdx + 1;
        setSurveyForm(newSurveyForm);
    }

    const onActionItem3 = ({ key, rowIdx, colIdx, choiceIdx, uuid }) => {
        const newSurveyForm = { ...surveyForm };
        const foundIdx = newSurveyForm[key].findIndex((item) => item['uuid'] === uuid);
        newSurveyForm[key][foundIdx].choice[colIdx] = choiceIdx + 1;
        setSurveyForm(newSurveyForm);
    }

    const onActionItem4 = ({ key, text }) => {
        const newSurveyForm = { ...surveyForm };
        newSurveyForm[key]['text'] = text;
        setSurveyForm(newSurveyForm);
    }

    const validation = (surveyForm) => {
        console.log('surveyForm', surveyForm)
        const item1NotAnswered = surveyForm.item1.filter(item => item.answer.length === 0);
        const item2NotAnswered = surveyForm.item2Row.filter(row => {
            row.secondRow.filter(row => row.choice === 0)
        });
        //info: remove first column that is just title.
        const item3AnswerCnt = surveyForm.item3Col.length - 1;
        console.log('item3AnswerCnt', item3AnswerCnt);
        const item3NotAnswered = surveyForm.item3Row.filter(item => item.choice.length !== item3AnswerCnt)

        console.log('item1NotAnswered', item1NotAnswered);
        console.log('item2NotAnswered', item2NotAnswered);
        console.log('item3NotAnswered', item3NotAnswered);

        const ret = item1NotAnswered.length === 0 &&
            item2NotAnswered.length === 0 &&
            item3NotAnswered.length === 0;

        return ret;
    }

    const onSave = async () => {
        if (validation(surveyForm)) {
            const userInfo = await getSession();
            await setSurveyResultDb(userInfo, surveyForm);
            router.push('/userPage/finalize')
        }
        else {
            alert("there is not selected item");
        }
    }

    useEffect(() => {
        const init = async () => {
            const session = await getSession();
            setSession(session);
            const survey = await getSurveyDb();
            setSurveyForm(survey);
            const status = await getSubmitStatus(session);
            console.log('survye', status);
            setStatus(status);
        }

        init();
    }, []);

    if (session === null || status === null) {
        return <div> Loading. </div>
    }
    else {
        if (status.submitSurvey) {
            router.push('/userPage/finalize')
        }
        else {
            return (
                <div className='m-16'>
                    {surveyForm ?
                        <SurveyPreview content={surveyForm}
                            onAction={onActionItem1}
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
    }
}