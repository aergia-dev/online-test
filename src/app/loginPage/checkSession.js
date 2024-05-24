export  function isLogIn(session) {
    const notLogin = (session.userId === '') || 
    (session.userName === '') || 
    (session.userAffiliation === '') ||
    (session.clientId === '') ;
    

    console.log('notLogin', notLogin)
    return !notLogin; 
}

