'use server'

import { JSONFilePreset } from 'lowdb/node';

const assert =require('assert');

const dbTemplate = {
    levels: [{level: "beginner", desc: "초급"},
            {level: "itermediate", desc: "중급"},
            {level: "advanced", desc: "고급"}, 
            {level: "expert", desc: "특급"}],
    questionPool: {
        beginner: [],
        itermediate: [],
        advanced: [],
        expert: [],
    },
    test: [{nth: 10, 
            level: "beginner",
            question:[],  //collection of question uuid
            }] 
}

export default async function test(){ 
    const db = await JSONFilePreset('db.json', dbTemplate);
    assert.notEqual(db.data, null);

    if( db.data !== null)
    {
        db.read();
        console.log("!@!@", db.data);
    }
 }

  export async function insertQuestion(level, question) {
    const db = await JSONFilePreset('db.json', dbTemplate);
    db.read();
    question.map((e) => {db.data.questionPool[level].push(e);} );
    db.write();
  }

