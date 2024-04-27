'use client'

import SurveyPriview from "@/component/surveyPreview";
import { useState, useEffect } from "react";
import { getSurveyDb } from '@/component/db'

export default function Survey() {
    const [surveyForm, setSurveyForm] = useState();

    useEffect(() => {
        const updateInitVal = async () => {
            const survey = await getSurveyDb();
            console.log("####", survey);
            setSurveyForm(survey);
        }

        updateInitVal();
    }, []);

    return (
        surveyForm && SurveyPriview(surveyForm)
    );
}