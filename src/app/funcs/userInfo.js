import ShowTime from "../component/elapsedTime";
import { useState, useEffect } from "react";

// userId: session.userId,
// userName: session.userName,
// userAffiliation: session.userAffiliation,
// clientId: session.clientId

export default function UserInfo({ session }) {
    const [elapsedTime, setElapsedTime] = useState(0);

    useEffect(() => {
        const startTime = Date.now();
        const intervalId = setInterval(() => {
            const s = Math.floor((Date.now() - startTime) / 1000);
            setElapsedTime({
            });

            setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
        }, 1000);

        return () => clearInterval(intervalId);
    });


    const second = 0;
    if (session) {
        return (
            <nav className='fixed top-0 left-0 right-0 bg-gray-600 text-white shadow-md z-50 '>
                <div className='flex flex-row justify-between'>
                    <div className=''>
                        <ShowTime preStr={'경과 시간'} second={elapsedTime} />
                    </div>
                    <div className='flex flex-row space-x-4 justify-center m-2'>
                        <div> 교번: {session.userId} </div>
                        <div> 교번: {session.userAffiliation} </div>
                        <p> 이름: {session.userName} </p>
                    </div>
                </div>
            </nav >
        );
    }
    else {
        return <div></div>
    }
}
