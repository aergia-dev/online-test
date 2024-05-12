'use client'

import React from 'react';

export default function SurveyPreview({ content, onAction, onActionItem2, onActionItem3, onActionItem4, onSave }) {
    const { title, head, item1, item1Row, item2Desc, item2Col, item2Row, item3Desc, item3Col, item3Row, item4Desc, item4Input, commonSelection } = content;
    return (
        <div className=''>
            <div className='text-4xl mb-8'>
                <p className="text-center text-2xl font-bold">
                    {content.title}
                </p>
            </div>
            <div className='bg-amber-200 mb-4'>
                <p className=' border border-solid border-gray-800 font-bold p-2'>
                    {content.head}
                </p>
            </div>
            <div className='mb-8'
                id='item1'>
                {Item1Preview(content.item1Row, content.item1, onAction)}
            </div>
            <div id='item2 mb-8'>
                {Item2Preview(item2Desc, item2Col, item2Row, onActionItem2)}
            </div>
            <div id='item3 mb-8'>
                {Item3Preview(item3Desc, item3Col, item3Row, onActionItem3)}
            </div>
            <div id='item4 mb-8'>
                {Item4Preview(item4Desc, item4Input, onActionItem4)}
            </div>
            <div className=''
                id='submit'>
                <button className='bg-blue-500'
                    onClick={() => onSave()}> 제출
                </button>
            </div>
        </div>
    )
}

function Item1Preview(item1Row, item1, onAction) {
    return (
        <table className='w-full border border-collapse border-solid border-gray-800 p-1'>
            <tbody>
                <tr>
                    <td className='border border-solid border-gray-800 bg-blue-400 text-center'>
                        {item1Row}
                    </td>
                    <td className='border border-solid border-gray-800'>
                        {item1.map(({ itemName, selection, answer, uuid }, rowIdx) => {
                            return (
                                <div className='flex flex-row space-x-4 m-2'
                                    key={itemName + selection + rowIdx}>
                                    <div className=''
                                        key={itemName + + rowIdx}>{itemName + ": "}
                                    </div>
                                    {
                                        selection.map((item, idx) => {
                                            if (idx + 1 === answer) {
                                                return (<div className='bg-blue-500 rounded text-white font-bold'
                                                    key={item + idx}>
                                                    {item}
                                                </div>)
                                            }
                                            else
                                                return <div className=''
                                                    key={item + idx}
                                                    onClick={() => onAction({
                                                        key: 'item1',
                                                        rowIdx: rowIdx,
                                                        uuid: uuid,
                                                        choiceIdx: idx
                                                    })}>
                                                    {item} </div>
                                        })
                                    }
                                </div>)
                        })}
                    </td>
                </tr>
            </tbody>
        </table >
    )
};

function item2Body(item2Row, onActionItem2) {
    const singleRow = ({ rowHead, rowspan, secondRow, common }, rowIdx) => {
        const firstRow = secondRow[0];
        const restRow = secondRow.slice(1);
        return (
            <>
                <tr key={rowHead + rowIdx + 'tr'}>
                    <td rowSpan={rowspan}
                        key={rowHead + rowIdx + 'td'}
                        className="border border-solid border-gray-800 text-center bg-blue-400">
                        {rowHead}
                    </td>

                    <td className="border border-solid border-gray-800 bg-blue-400"
                        key={rowHead + rowIdx + 'firstrow'}>
                        {firstRow.str}
                    </td>
                    {common.map((s, choiceIdx) => {
                        if (choiceIdx === firstRow.choice - 1) {
                            return (<td className="border border-solid border-gray-800 text-center bg-green-300"
                                key={firstRow.uuid + '_' + choiceIdx}>
                                {s}
                            </td>)
                        }
                        else {
                            return (<td className="border border-solid border-gray-800 text-center"
                                key={firstRow.uuid + '_' + choiceIdx}
                                onClick={() => onActionItem2({ key: 'item2Row', uuid: firstRow.uuid, rowIdx: rowIdx, choiceIdx: choiceIdx })}>
                                {s}
                            </td>)

                        }
                    })}
                </tr>
                {restRow.map(({ str, choice, uuid }) => {
                    // console.log("row", str, choice, uuid);
                    return (<tr key={uuid}>
                        <td className="border border-solid border-gray-800 bg-blue-400"
                            key={uuid + 'q'}> {str} </td>
                        {common.map((s, choiceIdx) => {
                            if (choice - 1 === choiceIdx) {
                                return (<td className="border border-solid border-gray-800 text-center bg-green-300"
                                    key={uuid + '_' + choiceIdx}
                                    onClick={() => onActionItem2({ key: 'item2Row', uuid: uuid, rowIdx: rowIdx, choiceIdx: choiceIdx })}>
                                    {s}
                                </td>)
                            }
                            else {
                                return (<td className="border border-solid border-gray-800 text-center"
                                    key={uuid + '_' + choiceIdx}
                                    onClick={() => onActionItem2({ key: 'item2Row', uuid: uuid, rowIdx: rowIdx, choiceIdx: choiceIdx })}>
                                    {s}
                                </td>)
                            }
                        })}
                    </tr>
                    )
                })}
            </>
        )
    }

    return (
        <tbody>
            {item2Row.map((row, idx) => (
                <React.Fragment key={idx}>
                    {singleRow(row, idx)}
                </React.Fragment>)
            )}
        </tbody>
    )
}


function Item2Preview(item2Desc, item2Col, item2Row, onActionItem2) {
    return (
        <div className='mb-8'>
            <div> {item2Desc} </div>
            <table className='w-full border border-collapse border-solid border-gray-800'>
                <thead>
                    <tr>
                        {item2Col.map(({ str, colspan }, idx) => (
                            (idx === 0) ?
                                <td colSpan={colspan}
                                    key={'item2-' + str + { idx }}
                                    className='text-center border border-solid border-gray-800 bg-blue-400'> {str} </td>
                                :
                                <td colSpan={colspan}
                                    key={'item2-' + str + { idx }}
                                    className='text-center border border-solid border-gray-800'> {str} </td>
                        ))}
                    </tr>
                </thead>
                {item2Body(item2Row, onActionItem2)}
            </table>
        </div>);
}

function Item3Preview(item3Desc, item3Col, item3Row, onActionItem3) {
    const choiceCommon = item3Col.slice(1).map(({ uuid, common }) => { return { colUuid: uuid, common: common } })

    return (
        <div className='mb-8'>
            <p className='font-bold mb-2'>{item3Desc}</p>
            <table className='w-full border border-collapse border-solid border-gray-800'>
                <thead>
                    <tr>
                        {item3Col.map(({ str, colspan, uuid, common }) => (
                            <td className='border border-solid border-gray-800 text-center bg-blue-400'
                                key={uuid}
                                colSpan={colspan}>
                                {str}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {item3Row.map(({ str, uuid, choice }, rowIdx) => (
                        <tr key={uuid + '_row'}>
                            <td className='border border-solid border-gray-800 bg-blue-400'
                                key={uuid + '_' + rowIdx}>
                                {str}
                            </td>
                            {choiceCommon.map(({ colUuid, common }, colIdx) => (
                                common.map((val, choiceIdx) => {
                                    if (choiceIdx === choice[colIdx] - 1) {
                                        return (<td className='border border-solid border-gray-800 text-center bg-green-300'
                                            key={uuid + '_' + colUuid + '_' + choiceIdx}>
                                            {val}
                                        </td>)
                                    } else {
                                        return (<td className='border border-solid border-gray-800 text-center'
                                            key={uuid + '_' + colUuid + '_' + choiceIdx}
                                            onClick={() => onActionItem3({ key: 'item3Row', rowIdx: rowIdx, colIdx: colIdx, choiceIdx: choiceIdx, uuid: uuid })}>
                                            {val}
                                        </td>)

                                    }
                                })
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function Item4Preview(item4Desc, item4Input, onActionitem4) {
    return (
        <div>
            <div className='font-bold'> {item4Desc} </div>
            <textarea id="item4" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder={item4Input.text}
                onChange={(event) => {
                    onActionitem4({ key: 'item4Input', text: event.target.value }
                    )
                }} >
            </textarea>
        </div>
    )
}
