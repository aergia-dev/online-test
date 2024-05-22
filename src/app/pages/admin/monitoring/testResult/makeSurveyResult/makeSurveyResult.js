import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver';
import makeForm1Data from './makeForm1Data';
import makeForm2Data from './makeForm2Data';
import makeForm3Data from './makeForm3Data';



export default async function makeSurveyResult(survey) {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = '';
    workbook.lastModifiedBy = '';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.lastPrinted = new Date();

    const wsForm1 = workbook.addWorksheet('기본 항목');
    const wsForm2 = workbook.addWorksheet('기본 항목 - 그래프');
    const wsForm3 = workbook.addWorksheet('교육 훈련');

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

    //todo: later
    // const wsForm2Data = makeForm2(survey);
    wsForm2.getColumn(1).values = [1, 2, 3, 4, 5];


    const wsForm3Data = makeForm3Data(survey);
    wsForm3.addRow(wsForm3Data.colHead);

    wsForm3Data.score.map((userScore, idx) => {
        // const score = userScore.map(item => item.score);
        // const scoreSum = score.reduce((acc, cur) => acc += cur, 0)
        // console.log('score', score, score / score.length)

        // wsForm3.addRow([idx, ...score, scoreSum / score.length]);
        wsForm3.addRow(userScore);
    });


    // const scores = wsForm3Data.score.reduce((acc, userScore) => {
    //     console.log('userscore', userScore.map(item => item.score))
    //     acc.push(userScore.map(item => item.score));
    //     return acc;
    // }, []);

//    wsForm3.addRow()

    //alignment of wsForm3
    const rowCnt = wsForm3Data.score.length;
    wsForm3.eachRow((row, rowNumber) => {
        row.eachCell((cell, cellNumbeer) => {
            cell.alignment = { horizontal: 'center', vertical: 'center' }
        })
    })



    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(blob, 'surveyResult.xlsx');
}