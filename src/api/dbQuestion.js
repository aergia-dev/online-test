'use server';
import { openDb } from "../component/db";

export default async function getQuestion() {
    console.log("#######################");
    const dbData = await openDb();
    return dbData;
}

