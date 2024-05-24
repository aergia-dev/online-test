export default function Sidebar() {
    return (
        <aside id="default-sidebar" className=" top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    <li>
                        <a href="/adminPage/monitoring/realTime" className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">시험 진행</span>
                        </a>
                    </li>
                    <li>
                        <a href="/adminPage/monitoring/testResult" className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                            <span className="ms-3">시험 결과</span>
                        </a>
                    </li>
               </ul>
            </div>
        </aside>
    );
}