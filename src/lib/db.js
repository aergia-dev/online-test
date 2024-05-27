'use server'

import { JSONFilePreset } from 'lowdb/node';
import { loadImage } from './image';

const QuestionDb = './db/questions.json';
const TestResultDb = './db/testResult.json';

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

export async function saveTestDb(title, question) {
    const db = await JSONFilePreset('./db/questions.json', dbTemplate);
    db.read();
    const isExist = db.data.testList.findIndex((str) => title === str);

    if (isExist !== -1) {
        db.data.testList.splice(isExist);
        const testIdx = db.data.test.findIndex((test) => test.title === title);
        if (testIdx !== -1)
            db.data.test.splice(testIdx)
    }

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

    if (curTest) {
        //info: remove answer
        const withoutAnswer = curTest.question.map((q) => {
            q.Qanswer = { 'userAnswer': [], 'answers': [], 'answerCnt': q.Qanswer.answerCnt };
            return q;
        });

        curTest.question = withoutAnswer;
        console.log('getTestQuestionForUserDb', curTest)
    }

    // curTest.question = await Promise.all(withoutAnswer)
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

export async function isAlreadySubmitQuestionDb(userInfo) {
    const db = await JSONFilePreset(QuestionDb, dbTemplate);
    db.read();

    const clientId = userInfo.clientId;
    const result = await db.data.testResult.userResult?.find((result) => result.userInfo['clientId'] === clientId);

    return { submitTest: result.userInfo.testEndTime ? true : false,
             submitSurvey: result.userInfo.surveyEndtime ? true : false };
}

export async function makeInitialTestResultDb(userInfo) {
    const db = await JSONFilePreset(QuestionDb, dbTemplate);
    db.read();

    if (userInfo) {
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
    else {
        console.log('userinfo is null')
    }
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
    target['userInfo']['testEndTime'] = new Date();
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
    target.userInfo.surveyEndTime = new Date();
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
        const resultDb = await JSONFilePreset(TestResultDb, {});
        resultDb.read();
        resultDb.data['testResult'].push(db.data.testResult);
        resultDb.write();
    }

    db.data.testResult = {};
    db.data.currentTest = {};
    db.write();
}

export async function getAllTestResultDb(title) {
    const resultDb = await JSONFilePreset(TestResultDb, {});
    resultDb.read();

    const testReslut = await resultDb.data['testResult'].find((a) => a.title === title);

    return testReslut;
}

export async function getAllTestResultTitlesDb() {
    const resultDb = await JSONFilePreset(TestResultDb, {});
    resultDb.read();
    console.log('resultDb', resultDb.data);
    const titles = resultDb.data['testResult'].map((result) => result.title)

    return titles;
}

export async function deleteTitleDb(title) {
    console.log('delete title', title);
    const db = await JSONFilePreset(TestResultDb, {});
    db.read();
    const idx = db.data.testResult.findIndex((result) => result.title === title);
    // const newResult = db.data['testResult'].filter(result => result.title !== title);
    // console.log("found idx", idx);
    db.data['testResult'].splice(idx, 1);
    // console.log("aa", db.data['testResult'])
    // db.data['testResult'].map(result => console.log(result.title));
    db.write();
}


export async function deleteUserTestResultDb(title, clientId) {
    const db = await JSONFilePreset(TestResultDb, {});
    db.read();
    const testResult = db.data.testResult.filter((result) => result.title === title);
    console.log(testResult);
    console.log(testResult[0].userResult);
    const idx = testResult[0].userResult.findIndex((result) => result.userInfo.clientId === clientId);
    testResult[0].userResult.splice(idx, 1);
    db.write();
}

export async function deleteQuestiondb(level, QuuidLst) {
    // console.log('quuidList', level, QuuidLst);
    const db = await JSONFilePreset(QuestionDb, {});
    db.read();
    const questionPool = db.data.questionPool[level];
    console.log('before', questionPool);
    const newQuestionPool = questionPool.filter(q => !QuuidLst.includes(q.Quuid));
    db.data.questionPool[level] = newQuestionPool;

    console.log('after', newQuestionPool);
    db.write();
}