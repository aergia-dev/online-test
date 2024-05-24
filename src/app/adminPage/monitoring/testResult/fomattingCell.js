
//info: vertical align 'top', 'middle', 'bottom'
//info: horizontal align 'left', 'center', 'right'

export function alignmentSheet(worksheet, alignVertical, alignHorizontal) {
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, cellNumbeer) => {
            cell.alignment = { horizontal: alignHorizontal, vertical: alignVertical }
        })
    })
}