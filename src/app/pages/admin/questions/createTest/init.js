'use client'
// import { getQuestionPool } from '@/component/db'
import { useState, useEffect } from 'react';
import getQuestion from '@/api/dbQuestion'
import useSWR from 'swr';


function LevelDropdown() {
    // const [levels, setLevels] = useState([]);

    // const fetchLevels = async () => {
    //     const res = await fetch('/api/dbQuestion', { method: 'GET' });
    //     if (res.status === 200) {
    //         const { levels } = await res.json();
    //         setLevels(levels);
    //     }
    //     else {
    //         console.log("err", res.status);
    //     }
    // }

    // useEffect(() => {
    //     fetchLevels();
    // }, []);
    // const fetcher = (...args) => fetch(...args).then(res => res.json())
    const { data, error, isLoading } = useSWR('/pages/api/dbQuestion', getQuestion);

    console.log("fetched levels: ", data, error, isLoading);
    const levels = {}; //= data['levels'];
    // setLevels(data['levels']);
    console.log('level: ', levels);
    const [toggle, setToggle] = useState();
    // levels.map(({level, desc}, idx) => {
    //     console.log("level: ", level, desc, idx);
    // });

    return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Options
                    <svg className="-mr-1 h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>

            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex="-1">
                <div className="py-1" role="none">
                    {/* {levels.map(({ level, desc }, idx) => {
                        console.log(level, desc, idx);
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm"
                            role="menuitem"
                            tabIndex="-1"
                            id={"menu" + level}>
                            {desc}
                        </a>
                    })} */}


                    <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</a>
                </div>
            </div>
        </div>
        //         <div className="relative inline-block text-right">
        //             <div>
        //                 <button type="button"
        //                     className="inline-flex w-full justify-cetner gap-x-1.5 bg-white px-3 py-2 text-sm font-semibod text-gray-900 shadow-sm ring-inset ring-gray-300"
        //                     id="menu-btn"
        //                     aria-expanded="true"
        //                     aria-haspopup="true">
        //                     등급
        //                     <svg className="-mr-1 h-5 w-5 text-gray-400"
        //                         viewBox="0 0 20 20"
        //                         fill="currentColor"
        //                         aria-hidden="true">
        //                         <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" 
        //                         clipRule="evenodd" />
        //                     </svg>
        //                 </button>
        //             </div>
        //             <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        //             // "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        //                 role="menu"
        //                 aria-orientation="vertical"
        //                 aria-labelledby="menu-btn"
        //                 tabIndex="-1">
        //                 <div className="py-1"
        //                     role="none">
        //  <a href="#" className="text-gray-700 block px-4 py-2 text-sm" role="menuitem" tabIndex="-1" id="menu-item-0">Account settings</a>

        //                      {/* {levels.map(({ level, desc }) => {
        //                         <a href="#" className="text-gray-700 block px-4 py-2 text-sm"
        //                             role="levelItem"
        //                             tabindex="-1"
        //                             id={level}>
        //                             {desc}
        //                         </a>
        //                     })} */}

        //                 </div>
        //             </div>
        //         </div>
    );
}

export default LevelDropdown;