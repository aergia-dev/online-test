import Image from 'next/image';
import React from 'react';


export function renderQuestionWithAnswer(questions, onClickQuestion, markingAnswerMultiChoice, markingAnswerEassay) {
    const renderMultChoiceSelction = (Quuid, Qselection, Qanswer) => {
        return (Qselection.map((item, selectionIdx) => {
            if (Qanswer.length !== 0 && Qanswer.answers.includes(selectionIdx + 1)) {
                return (<p className='text-red-400'
                    key={Quuid + "-" + selectionIdx + '-selection'}
                    onClick={() => { markingAnswerMultiChoice && markingAnswerMultiChoice(Quuid, selectionIdx) }}>
                    {(selectionIdx + 1) + '. ' + item}
                </p>)
            }
            else {
                return (<p key={Quuid + "-" + selectionIdx + '-selection'}
                    onClick={() => { markingAnswerMultiChoice && markingAnswerMultiChoice(Quuid, selectionIdx) }}>
                    {(selectionIdx + 1) + '. ' + item}
                </p>)
            }
        }))
    }

    const renderEssayAnswer = (Quuid, Qanswer) => {
        console.log('Qanswer', Qanswer)
        if (Qanswer.answers.length !== 0) {
            return (<p key={Quuid + "-essay"}> 답 목록 :
                {Qanswer.answers.join(', ')}
            </p>)
        }
        else {
            return (
                <input className='w-full border border-gray-300 text-gray-900'
                    onBlur={() => { markingAnswerEassay() }}>
                </input>
            );
        }

    }

    const renderSingleQ = ({ Quuid, Qtype, Qtext, Qimg, Qselection, Qanswer }, qIdx) => {
        const isMultChoice = Qtype === 'multChoice';
        return (<div className='border border-gray-300 border-2 px-2 py-2'
            onClick={() => { onClickQuestion && onClickQuestion(Quuid, Qtype, Qtext, Qimg, Qselection, Qanswer); }}
            key={Quuid}>
            <p key={Quuid + '-text'}>{qIdx + '. ' + Qtext}</p>
            {Qimg.content !== null && <Image src={Qimg.content} width={Qimg.width} height={Qimg.height} alt='images' />}
            {isMultChoice ?
                (renderMultChoiceSelction(Quuid, Qselection, Qanswer))
                :
                (renderEssayAnswer(Quuid, Qanswer))
            }
        </div>);
    }

    return (
        <React.Fragment>
            {questions && questions.map((question, idx) => (renderSingleQ(question, idx + 1)))}
        </React.Fragment>
    )
}


export function renderQuestionForUser(questions, markingAnswerMultiChoice, markingAnswerEassay) {
    const renderMultChoiceSelction = (Quuid, Qselection, Qanswer) => {
        return (Qselection.map((item, selectionIdx) => {
            if (Qanswer.length !== 0 && Qanswer.userAnswer.includes(selectionIdx + 1)) {
                return (<p className='text-red-400'
                    key={Quuid + "-" + selectionIdx + '-selection'}
                    onClick={() => { markingAnswerMultiChoice && markingAnswerMultiChoice(Quuid, selectionIdx) }}>
                    {(selectionIdx + 1) + '. ' + item}
                </p>)
            }
            else {
                return (<p key={Quuid + "-" + selectionIdx + '-selection'}
                    onClick={() => { markingAnswerMultiChoice && markingAnswerMultiChoice(Quuid, selectionIdx) }}>
                    {(selectionIdx + 1) + '. ' + item}
                </p>)
            }
        }))
    }

    const renderEssayAnswer = (Quuid) => {
        return (
            <input className='w-full border border-gray-300 text-gray-900'
                onBlur={(e) => { markingAnswerEassay(Quuid, e.target.value) }}>
            </input>
        );
    }

    const renderSingleQ = ({ Quuid, Qtype, Qtext, Qimg, Qselection, Qanswer }, qIdx) => {
        const isMultChoice = Qtype === 'multChoice';
        return (<div className='border border-gray-300 border-2 px-2 py-2'
            key={Quuid}>
            <p key={Quuid + '-text'}>{qIdx + '. ' + Qtext}</p>
            {Qimg.content !== null && <Image src={Qimg.content} width={Qimg.width} height={Qimg.height} alt='images' />}
            {isMultChoice ?
                (renderMultChoiceSelction(Quuid, Qselection, Qanswer))
                :
                (renderEssayAnswer(Quuid))
            }
        </div>);
    }

    return (
        <React.Fragment>
            {questions && questions.map((question, idx) => (renderSingleQ(question, idx + 1)))}
        </React.Fragment>
    )
}