import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver';
import makeForm1Data from './makeForm1Data';
import makeForm2Data from './makeForm2Data';
import makeForm3Data from './makeForm3Data';
import makeForm4Data from './makeForm4Data';
import makeForm5Data from './makeForm5Data';
import { alignmentSheet } from '../fomattingCell';


export default async function makeSurveyResult(survey) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = '';
    workbook.lastModifiedBy = '';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    const wsForm1 = workbook.addWorksheet('기본 항목');
    const wsForm2 = workbook.addWorksheet('기본 항목 - 그래프');
    const wsForm3 = workbook.addWorksheet('교육 평가');
    const wsForm4 = workbook.addWorksheet('강사 평가');
    const wsForm5 = workbook.addWorksheet('개선 사항');

    wsForm1.columns = [
        { header: "순서", key: 'order', width: 10 },
        { header: "성별", key: 'sex', width: 10 },
        { header: "연령", key: 'age', width: 10 },
        { header: "최종학력", key: 'educationLevel', width: 10 },
        { header: "소속기관", key: 'belongs', width: 10 },
        { header: "직위", key: 'position', width: 10 },
        { header: "기술등급", key: 'techLevel', width: 10 },
        { header: "총 근무년수", key: 'yearOfService', width: 10 },
    ];

    const wsForm1Data = makeForm1Data(survey);
    console.log('wsForm1Data', wsForm1Data);
    wsForm1Data.map(({ sex, age, educationLevel, belongs, position, techLevel, yearOfService }, order) => {
        console.log("idx", order)
        wsForm1.addRow({ order: order + 1, sex, age, educationLevel, belongs, position, techLevel, yearOfService })
    })
    alignmentSheet(wsForm1, 'center', 'center');

    //todo: later
    const wsForm2Data = makeForm2Data(survey);
    wsForm2Data.map(items => {
        console.log(
            'items', items
        )
        wsForm2.addRow([items.itemName]);
        items.data.map(item =>
            wsForm2.addRow(['', item.str, item.cnt, item.percent]));

        wsForm2.addRow([]);
        wsForm2.addRow([]);
    });


    // wsForm2.getColumn(1).values = [1, 2, 3, 4, 5];
    alignmentSheet(wsForm2, 'center', 'center');

    const wsForm3Data = makeForm3Data(survey);
    wsForm3.addRow(wsForm3Data.colHead);
    wsForm3Data.score.map((userScore, idx) => {
        wsForm3.addRow(userScore);
    });
    alignmentSheet(wsForm3, 'center', 'center');

    const wsForm4Data = makeForm4Data(survey);
    const mergeCellSz = 4;
    const row = wsForm4.getRow(1);
    for (let i = 0; i < wsForm4Data.col1stHead.length; i++) {
        const startIdx = 2;
        const cellIdx = startIdx + i * mergeCellSz;
        wsForm4.mergeCells(1, cellIdx, 1, cellIdx + mergeCellSz - 1);
        row.getCell(cellIdx + mergeCellSz - 1).value = wsForm4Data.col1stHead[i];
    }

    wsForm4.addRow(wsForm4Data.col2ndHead);
    wsForm4Data.score.map((userScore, idx) => {
        wsForm4.addRow(userScore);
    });
    alignmentSheet(wsForm4, 'center', 'center');


    const wsForm5Data = makeForm5Data(survey);
    console.log('wsForm5Data', wsForm5Data);

    wsForm5.mergeCells(1, 1, 1, 2);
    const wsFrom5Row = wsForm5.getRow(1);
    wsFrom5Row.getCell(2).value = wsForm5Data.head;

    wsForm5Data.content.map((item) => {
        wsForm5.addRow(item);
    })

    alignmentSheet(wsForm5, 'center', 'center');

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'surveyResult.xlsx');
}