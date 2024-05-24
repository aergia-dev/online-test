

// userId: session.userId,
// userName: session.userName,
// userAffiliation: session.userAffiliation,
// clientId: session.clientId

export default function UserInfo({ session }) {
    console.log('session', session)

    if (session) {
        return (
            <div className='flex flex-row space-x-4'>
                <div> 교번: {session.userId} </div>
                <div> 교번: {session.userAffiliation} </div>
                <p> 이름: {session.userName} </p>
            </div>
        );
    }
    else {
        return <div></div>
    }
}