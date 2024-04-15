import { getQuestionPool } from '@/component/db'

const LevelDropdown = (levels) => {
    console.log(" im in LevelDropdown ");
    console.log(levels);
    return (
        <div className="relative inline-block text-left">
            <div>
                <button type="button"
                    className="inline-flex w-full justify-cetner gap-x-1.5 bg-white px-3 py-2 text-sm font-semibod text-gray-900 shadow-sm ring-inset ring-gray-300"
                    id="level-btn"
                    aria-expanded="true"
                    aria-haspopup="true">
                    등급
                    <svg className="-mr-1 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true">
                        <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" 
                        clipRule="evenodd" />
                    </svg>
                </button>
            </div>
            <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="level-btn"
                tabIndex="-1">
                <div className="py-1"
                    role="none">

                    {/* {levels.map(({ level, desc }) => {
                        <a href="#" className="text-gray-700 block px-4 py-2 text-sm"
                            role="levelItem"
                            tabindex="-1"
                            id={level}>
                            {desc}
                        </a>
                    })} */}

                </div>
            </div>
        </div>
    );
}

LevelDropdown.getInitialProps = async () => {
    console.log("###############3 getInitialProps");
    try {
        const question = await getQuestionPool();
        const levels = question["levels"];

        console.log("read levels:", levels);
        return {levels: levels};
    } catch (err) {
        console.log("error fetching data:", err);
        return {levels: []};
    }
};

export default LevelDropdown;