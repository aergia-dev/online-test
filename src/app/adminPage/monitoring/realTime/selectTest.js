'use client'

import { useEffect, useState } from 'react';
import { loadTestList } from '@/lib/db';

// select test and click "start test" -> user can get a test page
// show client status

export default function SelectTest(props) {
    const [testList, setTestList] = useState([]);
    const [testTitle, setTestTitle] = useState();
    const [isDropdownOpened, setIsDropdownOpened] = useState();

    const getTestList = async () => {
        const testList = await loadTestList();
        console.log("testList", testList);
        setTestList(testList);
    };

    const handleOptionClick = (title) => {
        setTestTitle(title);
        props.setTestTitle(title);
        setIsDropdownOpened(!isDropdownOpened)
    }

    useEffect(() => {
        getTestList();
    }, []);
    return (
        <div className="relative inline-block text-left">
            <div className=''>
                <button type="button"
                    className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    id="menu-button"
                    aria-expanded="true"
                    aria-haspopup="true"
                    onClick={() => setIsDropdownOpened(!isDropdownOpened)}>
                    {testTitle ? testTitle : props.defaultVal}
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            {isDropdownOpened && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                    <div className="py-1" role="none">
                        {testList.map((test) => (
                            <a href="#" className="text-gray-700 block px-4 py-2 text-sm"
                                role="menuitem"
                                tabIndex="-1"
                                id={"menu" + test}
                                key={"menu" + test}
                                onClick={() => handleOptionClick(test)} >
                                {test}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

}
