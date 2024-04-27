

export default function SurveyPreview({ title, head, item1, item1Row, item2Desc, item2Col, item2Row, item3Desc, item3Col, item3Row, item4Desc, item4Input, commonSelection }) {
    return (
        <div>
            <p className="text-center text-3xl">
                {title}
            </p>
            <p className='border border-solid border-gray-800'>
                {head}
            </p>
            <div id='item1'>
                {Item1Preview(item1Row, item1)}
            </div>
            <div id='item2'>
                {Item2Preview(item2Desc, item2Col, item2Row, commonSelection)}
            </div>
            <div id='item3'>
                {Item3Preview(item3Desc, item3Col, item3Row, commonSelection)}
            </div>
            <div id='item4'>
                {Item4Preview(item4Desc)}
            </div>
        </div>
    )
}

function Item1Preview(item1Row, item1) {
    return (
        <table className='w-full border border-collapse border-solid border-gray-800'>
            <tbody>
                <tr>
                    <td className='border border-solid border-gray-800'>
                        {item1Row}
                    </td>
                    <td className='border border-solid border-gray-800'>
                        {item1.map(({ itemName, selection, answer }) => {
                            return (
                                <div className='flex flex-row m-4'>
                                    <div>{itemName + ": "}</div>
                                    {
                                        selection.map((item, idx) => {
                                            if (idx + 1 === answer)
                                                return <p className='text-red-500 m-4'> {item} </p>
                                            else
                                                return <p > {item} </p>
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

function item2Body(item2Row, questionIdx) {
    const choiceAction = (uuid, chooseIdx) => {
        console.log("choose", uuid, chooseIdx);
    }

    const singleRow = ({ rowHead, rowspan, secondRow, common }) => {
        const firstRow = secondRow[0];
        const restRow = secondRow.slice(1);
        return (
            <>
                <tr>
                    <td rowSpan={rowspan}
                        className="border border-solid border-gray-800 text-center">
                        {rowHead}
                    </td>

                    <td className="border border-solid border-gray-800"> {firstRow.str} </td>

                    {common.map((s, choiceIdx) => (
                        <td className="border border-solid border-gray-800 text-center"
                            key={firstRow.uuid + '_' + choiceIdx}
                            onClick={() => choiceAction(firstRow.uuid, choiceIdx + 1)}>
                            {s}
                        </td>
                    ))}
                </tr>
                {restRow.map((row, idx) => (
                    <tr key={row.uuid}>
                        <td className="border border-solid border-gray-800"
                            key={row.uuid + 'q'}> {row.str} </td>
                        {common.map((s, choiceIdx) => (
                            <td className="border border-solid border-gray-800 text-center"
                                key={row.uuid + '_' + choiceIdx}
                                onClick={() => choiceAction(row.uuid, choiceIdx + 1)}> {s} </td>
                        ))}
                    </tr>
                ))}
            </>
        )
    }

    return (
        <tbody>
            {item2Row.map((row) => (singleRow(row))
            )}
        </tbody>
    )
}

function Item2Preview(item2Desc, item2Col, item2Row) {
    return (
        <div>
            <div> {item2Desc} </div>
            <table className='w-full border border-collapse border-solid border-gray-800'>
                <thead>
                    <tr>
                        {item2Col.map(({ str, colspan }) => (
                            <td colSpan={colspan}
                                className='text-center border border-solid border-gray-800'> {str} </td>
                        ))}
                    </tr>
                </thead>
                {item2Body(item2Row)}
            </table>
        </div>);
}

function Item3Preview(item3Desc, item3Col, item3Row) {
    const choiceCommon = item3Col.slice(1).map(({ uuid, common }) => { return { colUuid: uuid, common: common } })

    return (
        <div>
            <p>{item3Desc}</p>
            <table className='w-full border border-collapse border-solid border-gray-800'>
                <thead>
                    <tr>
                        {item3Col.map(({ str, colspan, uuid, common }) => (
                            <td className='border border-solid border-gray-800'
                                key={uuid}
                                colSpan={colspan}>
                                {str}
                            </td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {item3Row.map(({ str, uuid, idx }) => (
                        <tr key={uuid + '_row'}>
                            <td className='border border-solid border-gray-800'
                                key={uuid + '_' + idx}>
                                {str}
                            </td>
                            {choiceCommon.map(({ colUuid, common }) => (
                                common.map((val, idx) => (
                                    <td className='border border-solid border-gray-800 text-center'
                                        key={uuid + '_' + colUuid + '_' + idx} >
                                        {val}
                                    </td>
                                ))
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

function Item4Preview(item4Desc) {
    return (
        <div>
            <div> {item4Desc} </div>
            <textarea id="item4" rows="5" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..." >
            </textarea>
        </div>
    )
}
