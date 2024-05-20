'use server'

import { JSONFilePreset } from 'lowdb/node';
import { loadImage } from './image';

const QuestionDb = './db/questions.json';

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
    const db = await JSONFilePreset(QuestionDb, dbTemplate);

    if (db.data !== null) {
        db.read();
        console.log("!@!@", db.data);
    }
}

export async function insertQuestionDb(level, question) {
    const db = await JSONFilePreset(QuestionDb, dbTemplate);
    db.read();
    console.log('insertQuestion', question, level);
    question.map((e) => { db.data.questionPool[level].push(e); });
    db.write();
}

export async function getQuestionPool() {
    const db = await JSONFilePreset(QuestionDb, dbTemplate);
    db.read();

    console.log("is called???");
    return db.data;
}

// export async function () {
//     const db = await JSONFilePreset('./db/questions.json', dbTemplate);
//     db.read();
//     const data = db.data;
//     // where is close? 
//     // should always copy? 
//     return data;
// }

export async function saveTest(title, question) {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    db.update(({ testList }) => testList.push(title));
    db.update(({ test }) => test.push({ title: title, question: question }))
}

export async function loadTestList() {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    return db.data.testList;
}

export async function setCurretnTestDB(title, onGoing, minimumScore) {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    db.data.currentTest = { title: title, onGoing: onGoing, minScore: minimumScore };
    db.write();

    if (onGoing) {
        const startTime = new Date();
        db.data.testResult = {
            title: title,
            startTime: startTime,
            endTime: undefined,
            userResult: []
        };
    }

    db.write();
    // const restResult = db.data.testResult.push({})
    // await db.update(({testResult}) => testResult.push("ASdf"));
    // console.log("testdb ", restResult);
}

export async function getCurrentTestDB() {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    return db.data.currentTest;
}

export async function getLevelQuestionsDB(level) {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    const questions = db.data.questionPool[level];
    const newQuestionPromise = questions.map(async (q) => {
        const newQ = q;
        if (q.Qimg.file !== null) {
            q.Qimg.content = await loadImage(q.Qimg.file);
        } else {
            q.Qimg.content = null;
        }

        return q;
    })

    const newQuestion = await Promise.all(newQuestionPromise)
    // console.log('newQeustion', newQuestion)

    return newQuestion;
}

export async function getTestQuestionForUserDb() {
    const db = await JSONFilePreset(QuestionDb, dbTemplate);
    db.read();
    const curTitle = db.data.currentTest['title'];
    const curTest = await db.data['test'].find((test) => test.title === curTitle);
    console.log("curTest ", curTest);

    //info: remove answer
    const withoutAnswer = curTest.question.map((q) => {
        q.Qanswer = { 'userAnswer': [], 'answers': [], 'answerCnt': q.Qanswer.answerCnt };
        return q;
    });

    curTest.question = withoutAnswer;

    // curTest.question = await Promise.all(withoutAnswer)
    console.log('getTestQuestionForUserDb', curTest)
    return curTest;
}

export async function getCurrentQuestionCnt() {
    const db = await JSONFilePreset(QuestionDb, dbTemplate);
    db.read();
    const curTitle = db.data.currentTest['title'];
    const curTest = await db.data['test'].find((test) => test.title === curTitle);
    console.log("curTest ", curTest);

    if (curTest === undefined)
        return 0
    else
        return curTest.length;
}

export async function makeInitialTestResultDb(userInfo) {
    const db = await JSONFilePreset(QuestionDb, dbTemplate);
    db.read();

    const result = await db.data.testResult.userResult?.find((result) => result.userInfo['clientId'] === userInfo.clientId);
    const curTitle = db.data.currentTest['title'];

    //info: make initial Result data
    if (result === undefined) {
        const curTest = await db.data['test'].find((test) => test.title === curTitle);
        db.data.testResult.userResult.push({
            userInfo: userInfo,
            answeredQuestionCnt: 0,
            questionCnt: curTest.question.length,
            resultQuestion: curTest
        });
    };
    db.write();
}

export async function setTestResultDb(userInfo, { Quuid, Qtype, userAnswer }) {
    //result fmt
    // "testResult": 
    //      "testTitle": 111,
    //      "status: 
    //          ["user": {idNum: "", affiliation: "", name: ""}
    //           "result: {question: uuid, answer: {idx} ... ]]
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    const testTitle = db.data.currentTest['title'];
    const userTestResult = await db.data.testResult.userResult?.find((result) => result.userInfo['clientId'] === userInfo.clientId);

    console.log('??result', userTestResult)
    const question = await userTestResult.resultQuestion.question.find((q) => q.Quuid === Quuid);

    if (question.Qanswer.userAnswer.length === 0) {
        userTestResult.answeredQuestionCnt += 1;
        console.log("cnt inc")
    }

    if (Qtype == 'essay') {
        question.Qanswer.userAnswer = [];
        question.Qanswer.userAnswer.push(userAnswer);
    }
    else {
        if (question.Qanswer.answerCnt === question.Qanswer.userAnswer.length) {
            question.Qanswer.userAnswer = question.Qanswer.userAnswer.slice(1);
        }

        question.Qanswer.userAnswer.push(userAnswer);
    }


    db.write();
}

export async function setFinalizeTestResulttDb(testResult) {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    const userResult = db.data.testResult.userResult;
    const target = await userResult.find((result) => result.userInfo.clientId === testResult.userInfo.clientId);
    target['question'] = testResult.question;
    target['userInfo']['score'] = testResult.userInfo.score;
    target['userInfo']['endTime'] = new Date();
    console.log("target", target)
    db.write();
}

export async function getUserTestResultDb(userInfo) {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    const result = await db.data.testResult.userResult?.find((result) => result.userInfo['clientId'] === userInfo.clientId);

    return result;
}

export async function getTestOnGoing() {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    const testOnGoing = db.data.currentTest.onGoing;

    return testOnGoing;
}

// export async function setFinishTestDb(clientId) {
//     const db = await JSONFilePreset('./db/questions.json', dbTemplate);
//     db.read();
//     const userResult =  db.data.testResult.userResult; 
//     const target = await userResult.find((result) => result.userInfo.clientId === clientId);
//     console.log("##### ", clientId, target);
//     target['endTime'] = new Date(); 
//     db.write();
// }

export async function getTestResultDb() {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();

    return db.data.testResult;
}

export async function setSurveyResultDb(userInfo, survey) {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    const userResult = db.data.testResult.userResult;
    const target = await userResult.find((result) => result.userInfo.clientId === userInfo.clientId);
    console.log("##### ", userInfo.clientId, target);
    target['surveyResult'] = survey;
    db.write();
}

export async function setSurveyDB(survey) {
    console.log("setSurveyDB", survey)
    const db = await JSONFilePreset('./db/survey.json', dbTemplate);
    db.read();
    db.data = survey;
    db.write();
}

export async function getSurveyDb() {
    const db = await JSONFilePreset('./db/survey.json', {});
    db.read();
    // console.log("survey", db.data);
    return db.data;
}

export async function getLevelDb() {
    const db = await JSONFilePreset('./db/questions.json', {});
    db.read();
    return db.data['levels'];
}

export async function setEndTestDb() {
    const db = await JSONFilePreset('./db/questions.json', {});
    db.read();
    console.log('test result', db.data.testResult);

    //only save when there is test result
    if (db.data.testResult.userResult.length > 0) {
        const resultDb = await JSONFilePreset('./db/testResult.json', {});
        resultDb.read();
        resultDb.data['testResult'].push(db.data.testResult);
        resultDb.write();
    }
    db.data.testResult = {};
    db.write();
}

export async function getAllTestResultDb(title) {
    const resultDb = await JSONFilePreset('./db/testResult.json', {});
    resultDb.read();

    const testReslut = await resultDb.data['testResult'].find((a) => a.title === title);

    return testReslut;
}

export async function getAllTestResultTilesDb() {
    const resultDb = await JSONFilePreset('./db/testResult.json', {});
    resultDb.read();
    console.log('resultDb', resultDb.data);
    const titles = resultDb.data['testResult'].map((result) => result.title)

    return titles;
}

