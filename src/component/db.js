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
    assert.notEqual(db.data, null);

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

export async function openDb(){
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    const data = db.data;
    // where is close? 
    // should always copy? 
    return data;
}

export async function saveTest(title, question){

    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    //update test list
    db.update(({testList}) => testList.push(title));
    db.update(({test}) => test.push({title: title, question: question}))
}