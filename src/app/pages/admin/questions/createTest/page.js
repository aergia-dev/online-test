'use client'
// import LevelDropdown from './init';
import { useState, useEffect } from 'react';
import getQuestion from '@/api/dbQuestion'
import { saveTest } from '@/component/db'

export default function CreateTest({ props }) {
    const [levels, setLevels] = useState({});
    const [isDropdownOpened, setIsDropdownOpened] = useState(false);
    const [toggle, setToggle] = useState();
    const [selectedOption, setSelectedOption] = useState();
    const [fullQuestion, setFullQuestion] = useState();
    const [question, setQuestion] = useState();
    const [selectedQ, setSelectedQ] = useState([]);
    const [nthTest, setNthTest] = useState("");

    const updateLevels = async () => {
        const q = await getQuestion();
        console.log("levels", q['levels']);
        setLevels(q['levels']);
        setFullQuestion(q);
        return q['levels'];
    }


    useEffect(() => {
        updateLevels();
    }, []);

    const handleOptionClick = (selectedLevel) => {
        // console.log("selected: ", selectedLevel)
        setSelectedOption(selectedLevel);
        setIsDropdownOpened(false);
        setQuestion(fullQuestion['questionPool'][selectedLevel['level']]);
        // console.log("qeustion ", question);
        // console.log("qeustion full", fullQuestion['questionPool'][selectedLevel['level']]);
    }

    const selectQuestion = (uuid, question, selection, answer) => {
        const curSelectedQ = selectedQ;
        // console.log(typeof (curSelectedQ));
        // curSelectedQ.push({ uuid: uuid, qustion: question, selection: selection });
        setSelectedQ(curSelectedQ => { return [...curSelectedQ, { uuid: uuid, question: question, selection: selection, answer:answer }]; });
        // console.log('curSelectedQ', curSelectedQ);
        // selectedQ.map(({ uuid, question, selection }) => {

        //     console.log('selected q item', uuid, question, selection);
        // });
    };
    const saveTestOnClick = () => {
        console.log("save", nthTest, " - ", selectedQ);
        saveTest(nthTest, selectedQ);
    }
    const inputOnChange = (event) => {
        setNthTest(event.target.value);
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-row w-full py-5">
                <div className="flex space-x-4 space-y-4 px-10">
                    <div className="relative inline-block text-left ">
                        <div>
                            <button type="button"
                                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
                                {selectedOption ? selectedOption['desc'] : "등급 선택"}
                                <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {isDropdownOpened && (
                            <div className=" right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                                <div className="py-1" role="none">
                                    {levels.map((levels, idx) => (
                                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm"
                                            role="menuitem"
                                            tabIndex="-1"
                                            id={"menu" + levels['level']}
                                            key={"menu" + levels['level']}
                                            onClick={() => handleOptionClick(levels)} >
                                            {levels['desc']}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <label> 회차: </label>
                    <input className="border rounded px-3 py-2 mb-3 text-gray-800"
                            id="nthTest"
                            value={nthTest}
                            onChange={inputOnChange}>
                    </input>
                </div>
                <button className='border border-2 bg-blue-200 px-3 py-2 rounded'
                onClick={() => {saveTestOnClick();}}>
                    저장
                </button>
            </div>
            <div className='flex flex-row w-full'>
                <div className='w-1/2 y-2 gap-2'>
                    {question && (question.map(({ uuid, question, selection, answer }) => (
                        <div className='border border-gray-300 border-2 px-2 py-2'
                            onClick={() => { selectQuestion(uuid, question, selection, answer); }}
                            key={uuid}>
                            {/* <p>{uuid}</p> */}
                            <p key={uuid + '-question'}>{question}</p>
                            {selection.map(({ idx, item }) =>
                                (<p key={uuid + "-" + idx + '-selection'}> {idx + '. ' + item} </p>))}
                        </div>
                    ))
                    )}
                </div>
                <div className='w-1/2'>
                    <div className='w-1/2 y-2 gap-2'>
                        {selectedQ && (selectedQ.map(({ uuid, question, selection }) => (
                            <div className='border border-gray-300 border-2 px-2 py-2'
                                key={'selected' + uuid}>
                                <p key={'selected-question' + uuid}>{question}</p>
                                {selection.map(({ idx, item }) =>
                                    (<p key={'selected-selection-' + idx + uuid}> {idx + '. ' + item} </p>))}
                            </div>
                        )))}
                    </div>
                </div>

            </div>
        </div >
    );
}