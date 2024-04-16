// 'use client'
import  LevelDropdown  from './init';
import { getQuestionPool } from '@/component/db'
// import {useState, useEffect} from 'react';

export default async function CreateTest({props}) {
    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row w-full">
                <div className="flex space-x-4 space-y-4">
                    <LevelDropdown />
                </div>
            </div>
        </div>
    );
}