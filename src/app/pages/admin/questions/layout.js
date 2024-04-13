import Sidebar from './sidebar'

export default function QuestionSideBar({ children }) {
    return (
        <div className="flex flex-row">
                <Sidebar />
                {children}
        </div>
    );
}