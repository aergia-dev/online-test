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

export async function setCurretnTestDB(title, onGoing) {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    db.data.currentTest = { title: title, onGoing: onGoing };
    db.write();
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
    console.log("db tes: ", test);
    return test;
}

export async function setTestResult(userInfo, question) {
//result fmt
// "testResult": 
//      "title: 111,
//      "testResult: 
//          ["user": {idNum: "", affiliation: "", name: ""}
//           "result: {question: uuid, answer: {idx} ... ]]
}
