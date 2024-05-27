import Image from 'next/image';
import React, { Fragment } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax'

const options = {
    output: 'SVG', // MathJax 결과물을 SVG 형식으로 설정합니다.
    tex: {
        inlineMath: [['$', '$']],
        displayMath: [['$$', '$$']],
    },
};

function toStr(input, isAnswer) {
    console.log(input)
    let answerColor = null;

    if (isAnswer)
        answerColor = 'text-red-400'

    // console.log('selection color', answerColor)
    return (
        <MathJax hideUntilTypeset={"first"}
            inline
            dynamic
            typesettingOptions='tex2svgPromise' >
            {input}
        </MathJax >
    );
}

export function renderQuestionWithAnswer(questions, onClickQuestion, markingAnswerMultiChoice, markingAnswerEassay) {
    const renderMultChoiceSelction = (Quuid, Qselection, Qanswer) => {
        return (Qselection.map((item, selectionIdx) => {
            if (Qanswer.length !== 0 && Qanswer.answers.includes(selectionIdx + 1)) {
                return (<div className='text-red-400 pl-8'
                    key={Quuid + "-" + selectionIdx + '-selection'}
                    onClick={() => { markingAnswerMultiChoice && markingAnswerMultiChoice(Quuid, selectionIdx + 1) }}>
                    {toStr(selectionIdx + 1 + '. ' + item, true)}
                </div>)
            }
            else {
                return (<div className='pl-8' key={Quuid + "-" + selectionIdx + '-selection'}
                    onClick={() => { markingAnswerMultiChoice && markingAnswerMultiChoice(Quuid, selectionIdx + 1) }}>
                    {toStr(selectionIdx + 1 + '. ' + item, false)}
                </div>)
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
        console.log('img', Qimg);
        return (<div className='border border-gray-300 border-2 px-2 py-2'
            onClick={() => { onClickQuestion && onClickQuestion(Quuid, Qtype, Qtext, Qimg, Qselection, Qanswer); }}
            key={Quuid}>
            <p key={Quuid + '-text'}>{qIdx + '. ' + Qtext}</p>
            {Qimg.content && <Image src={Qimg.content} width={Qimg.width} height={Qimg.height} alt='images' />}
            {isMultChoice ?
                (renderMultChoiceSelction(Quuid, Qselection, Qanswer))
                :
                (renderEssayAnswer(Quuid, Qanswer))
            }
        </div>);
    }

    return (
        <MathJaxContext>
            {questions && questions.map((question, idx) => (renderSingleQ(question, idx + 1)))}
        </MathJaxContext>
    )
}


export function renderQuestionForUser(questions, markingAnswerMultiChoice, markingAnswerEassay) {
    const renderMultChoiceSelction = (Quuid, Qselection, Qanswer) => {
        return (Qselection.map((item, selectionIdx) => {
            if (Qanswer.length !== 0 && Qanswer.userAnswer.includes(selectionIdx + 1)) {
                return (<p className='text-red-400'
                    key={Quuid + "-" + selectionIdx + '-selection'}
                    onClick={() => { markingAnswerMultiChoice && markingAnswerMultiChoice(Quuid, selectionIdx) }}>
                    {toStr(selectionIdx + 1 + '. ' + item)}
                </p>)
            }
            else {
                return (<p key={Quuid + "-" + selectionIdx + '-selection'}
                    onClick={() => { markingAnswerMultiChoice && markingAnswerMultiChoice(Quuid, selectionIdx) }}>
                    {toStr(selectionIdx + 1 + '. ' + item)}
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
        <MathJaxContext>
            {questions && questions.map((question, idx) => (renderSingleQ(question, idx + 1)))}
        </MathJaxContext>
    )
}

// export function renderQuestionPrint(questions, markingAnswerMultiChoice, markingAnswerEassay) {
export function RenderQuestionPrint(questions, markingAnswerMultiChoice, markingAnswerEassay) {
    const renderMultChoiceSelction = (Quuid, Qselection, Qanswer) => {
        return (<div>
            {Qselection.map((item, selectionIdx) => {
                if (Qanswer.length !== 0 && Qanswer.userAnswer.includes(selectionIdx + 1)) {
                    return (<p className='text-red-400'
                        key={Quuid + "-" + selectionIdx + '-selection'}
                        onClick={() => { markingAnswerMultiChoice && markingAnswerMultiChoice(Quuid, selectionIdx) }}>
                        {toStr(selectionIdx + 1 + '. ' + item)}
                    </p>)
                }
                else {
                    return (<p key={Quuid + "-" + selectionIdx + '-selection'}
                        onClick={() => { markingAnswerMultiChoice && markingAnswerMultiChoice(Quuid, selectionIdx) }}>
                        {toStr(selectionIdx + 1 + '. ' + item)}
                    </p>)
                }
            })}
        </div>)
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
        return (<div className='border border-gray-300 border-2 px-2 py-2 space-y-4'
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

    const mathJaxConfig = {
        loader: { load: ['input/tex', 'output/svg'] },
        tex: {
            inlineMath: [['$', '$'], ['\\(', '\\)']],
            displayMath: [['$$', '$$'], ['\\[', '\\]']],
            processEscapes: true,
        },
        svg: {
            fontCache: 'global',
        },
    };

    return (
        <Fragment>
            {/* <MathJaxContext config={mathJaxConfig} > */}
            <MathJaxContext
                version={2}
                config={options}
                onStartup={(mathJax) => (mathJax.Hub.processSectionDelay = 0)}
            >
                <div style={{ width: '210mm', height: '297mm', padding: '20mm' }}>
                    {questions && questions.map((question, idx) => (renderSingleQ(question, idx + 1)))}
                </div>
            </MathJaxContext>
        </Fragment>
    )
}