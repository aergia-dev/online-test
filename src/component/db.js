'use server'

import { JSONFilePreset } from 'lowdb/node';

const dbTemplate = {
    levels: [
        { level: "beginner", desc: "초급" },
        { level: "itermediate", desc: "중급" },
        { level: "advanced", desc: "고급" },
        { level: "expert", desc: "특급" }],
    questionPool: {
        beginner: [],
        itermediate: [],
        advanced: [],
        expert: [],
    },
    testList: [

    ],
    test: [
    ]
}

export default async function test() {
    const db = await JSONFilePreset('db.json', dbTemplate);

    if (db.data !== null) {
        db.read();
        console.log("!@!@", db.data);
    }
}

export async function insertQuestion(level, question) {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    question.map((e) => { db.data.questionPool[level].push(e); });
    db.write();
}

export async function getQuestionPool() {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();

    console.log("is called???");
    return db.data;
}

export async function openDb() {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    const data = db.data;
    // where is close? 
    // should always copy? 
    return data;
}

export async function saveTest(title, question) {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    db.update(({ testList }) => testList.push(title));
    db.update(({ test }) => test.push({ title: title, question: question }))
}

export async function loadTestList() {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    return db.data.testList;
}

export async function setCurretnTestDB(title, onGoing, minimumScore) {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    db.data.currentTest = { title: title, onGoing: onGoing, minScore:  minimumScore};
    db.write();

    if (onGoing) {
        const startTime = new Date();
        db.data.testResult = {
            title: title,
            startTime: startTime,
            endTime: undefined,
            userResult: []
        };
    } else {
        db.data.testResult = {};
    }

    db.write();
    // const restResult = db.data.testResult.push({})
    // await db.update(({testResult}) => testResult.push("ASdf"));
    // console.log("testdb ", restResult);
}

export async function getCurrentTestDB() {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    return db.data.currentTest;
}

export async function getQuestionDB(title) {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    const allTest = db.data.test;
    const test = allTest((test) => test['title'] === title);
    return test;
}

export async function getCurrentQuestion() {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    const curTitle = db.data.currentTest['title'];
    const test = await db.data['test'].find((test) => test.title === curTitle);
    console.log("test ", test);
    return test;
}

export async function getCurrentQuestionCnt() {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    const curTitle = db.data.currentTest['title'];
    const test = await db.data['test'].find((test) => test.title === curTitle);
    console.log("test ", test);
    return test.length;
}

export async function setTestResultDb(userInfo, answer) {
    //result fmt
    // "testResult": 
    //      "testTitle": 111,
    //      "status: 
    //          ["user": {idNum: "", affiliation: "", name: ""}
    //           "result: {question: uuid, answer: {idx} ... ]]
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    const testTitle = db.data.currentTest['title'];
    const result = await db.data.testResult.userResult?.find((result) => result.userInfo['clientId'] === userInfo.clientId);


    // console.log("!!! answer", answer.uuid, answer.selected);
    // console.log("set test result: ", result)
    if (result === undefined) {
        db.data.testResult.userResult.push({
            userInfo: userInfo, answer: [
                { uuid: answer.uuid, answer: answer.selected }
            ]
        });
    } else {
        const alreadAnswered = await result.answer.find((a) => a.uuid === answer.uuid);
        if(alreadAnswered === undefined) 
        {
            result.answer.push({ uuid: answer.uuid, answer: answer.selected });
        }
        else
        {
            alreadAnswered.answer = answer.selected;
            console.log("alreadAnswered", alreadAnswered);
        }

    }

    db.write();
}

export async function setFinalizeTestResulttDb(testResult){
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    const userResult =  db.data.testResult.userResult; 
    const target = await userResult.find((result) => result.userInfo.clientId === clientId);
    target['question'] = testResult.question;
    target['userInfo']['score'] = testResult.userInfo.score;
    target['endTime'] = new Date(); 
    db.write();
}

export async function getUserTestResultDb(userInfo) {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    const result = await db.data.testResult.userResult?.find((result) => result.userInfo['clientId'] === userInfo.clientId);

    return result;
}

export async function getTestOnGoing() {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    const testOnGoing = db.data.currentTest.onGoing;

    return testOnGoing;
}

// export async function setFinishTestDb(clientId) {
//     const db = await JSONFilePreset('db.json', dbTemplate);
//     db.read();
//     const userResult =  db.data.testResult.userResult; 
//     const target = await userResult.find((result) => result.userInfo.clientId === clientId);
//     console.log("##### ", clientId, target);
//     target['endTime'] = new Date(); 
//     db.write();
// }

export async function getTestResult() {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    
    return db.data.testResult;
}

export async function setSurveyResultDb(userInfo, survey) {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    const userResult =  db.data.testResult.userResult; 
    const target = await userResult.find((result) => result.userInfo.clientId === userInfo.clientId);
    console.log("##### ", userInfo.clientId, target);
    target['surveyResult'] = survey; 
    db.write();
}

export async function setSurveyDB(survey) {
    console.log("setSurveyDB", survey)
    const db = await JSONFilePreset('survey.json', dbTemplate);
    db.read();
    db.data = survey;
    db.write();
}

export async function getSurveyDb() {
    const db = await JSONFilePreset('survey.json', {});
    db.read();
    // console.log("survey", db.data);
    return db.data;
}

export async function getLevelDb() {
    const db = await JSONFilePreset('db.json', {});
    db.read();
    return db.data['levels'];
}

export async function setAllTestResultDb() {
    const db = await JSONFilePreset('db.json', {});
    db.read();

    const resultDb = await JSONFilePreset('testResult.json', {});
    resultDb.read();
    resultDb['testResult'].push(db.data.testResult);
    resultDb.write();

    db.testResult = [];
    db.write();
}