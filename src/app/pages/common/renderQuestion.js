import Image from 'next/image';
import React from 'react';

export function renderQuestion(questions, onClick) {
    const renderSingleQ = ({ Quuid, Qtype, Qtext, Qimg, Qselection, Qanswer }) => {
        const isMultChoice = Qtype === 'multChoice';
        return (<div className='border border-gray-300 border-2 px-2 py-2'
            onClick={() => { onClick(Quuid, Qtype, Qtext, Qimg, Qselection, Qanswer); }}
            key={Quuid}>
            <p key={Quuid + '-text'}>{Qtext}</p>
            {Qimg.content !== null && <Image src={Qimg.content} width={Qimg.width} height={Qimg.height} alt='images' />}
            {isMultChoice ?
                (Qselection.map((item, idx) =>
                    (<p key={Quuid + "-" + idx + '-selection'}> {(idx + 1) + '. ' + item} </p>)))
                :
                (<p key={Quuid + "-essay"}> 답 목록 :
                    {Qanswer.answers.join(', ')}
                </p>)
            }
        </div>);
    }

    return (
        <React.Fragment>
            {questions && questions.map(question => renderSingleQ(question))}
        </React.Fragment>
    )
}

