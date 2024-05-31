import Image from 'next/image';
import React, { Fragment } from 'react';
import { MathJax, MathJaxContext, MathJaxBaseContext } from 'better-react-mathjax'

function toStr(input, isAnswer) {
    let answerColor = null;

    if (isAnswer)
        answerColor = 'text-red-400'

    return (
        <MathJax>
            {input}
        </MathJax>
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
        // console.log('Qanswer', Qanswer)
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
        // console.log('img', Qimg);
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
export function RenderQuestionPrint(questions, markingAnswerMultiChoice, markingAnswerEassay, testFn) {
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
        loader: { load: ['input/tex', 'output/chtml'] },
        startup: {
            typeset: true,
            //         pageReady: () => {
            //             return window.MathJax.startup.defaultPageReady().then(() => {
            //               alert('MathJax initial typesetting complete');
            //             });
            //    },
            tex: {
                inlineMath: [['$', '$'], ['\\(', '\\)']],
                displayMath: [['$$', '$$'], ['\\[', '\\]']],
                processEscapes: true,
            },
            svg: {
                scale: 1,                      // global scaling factor for all expressions
                minScale: .5,                  // smallest scaling factor to use
                mtextInheritFont: false,       // true to make mtext elements use surrounding font
                merrorInheritFont: true,       // true to make merror text use surrounding font
                mathmlSpacing: false,          // true for MathML spacing rules, false for TeX rules
                skipAttributes: {},            // RFDa and other attributes NOT to copy to the output
                exFactor: .5,                  // default size of ex in em units
                displayAlign: 'center',        // default for indentalign when set to 'auto'
                displayIndent: '0',            // default for indentshift when set to 'auto'
                fontCache: 'local',            // or 'global' or 'none'
                localID: null,                 // ID to use for local font cache (for single equation processing)
                internalSpeechTitles: true,    // insert <title> tags with speech content
                titleID: 0                     // initial id number to use for aria-labeledby titles
            }
        }
    };

    return (
        <div id='mathJaxContext'>
            <MathJaxContext
                version={2}
                config={mathJaxConfig} >
                <div style={{ width: '210mm', height: '297mm', padding: '20mm' }}>
                    {questions && questions.map((question, idx) => (renderSingleQ(question, idx + 1)))}
                </div>
            </MathJaxContext>
        </div>
    )
}