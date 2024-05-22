import ExcelJS from 'exceljs'
import { saveAs } from 'file-saver';

function makeForm1(survey) {
    //info: "item1" in survey
    const item1 = survey.map((userSurvey, idx) => {
        const itemList = userSurvey.item1.map((item) => item.itemName);

        const result = itemList.map((itemName) => {
            const objs = userSurvey.item1.filter((item) => item.itemName === itemName);
            const obj = objs[0]
            return obj.selection[obj.answer - 1];
        });

        const form = ['sex', 'age', 'educationLevel', 'belongs', 'position', 'techLevel', 'yearOfService'];
        return form.reduce((acc, k, idx) => {
            acc[k] = result[idx];
            return acc;
        }, new Map());
    })

    console.log('item1', item1)
    return item1;
}

function makeForm2(survey) {
    console.log('survey', survey)
    const userCnt = survey.length;

    //info: "item1" in survey
    const userSelections = survey.map((userSurvey, idx) => {
        const itemList = userSurvey.item1.map((item) => item.itemName);

        const result = itemList.map((itemName) => {
            const objs = userSurvey.item1.filter((item) => item.itemName === itemName);
            const obj = objs[0]
            return obj.selection[obj.answer - 1];
        });
        return result;
    })

    //info: [{itemName, selection[]} .... ]
    const item1 = survey[0].item1;

    //['성명', '연령', '최종 학력', '소속 기관', '직위', '수로분야 기술등급', '총근무년수']
    const itemList = item1.map((item) => item.itemName);

    console.log("item1", item1);
    console.log("itemList", itemList);

    const rows = []
    let idx = 0;

    const result = itemList.map((item, idx) => {
        rows[idx] = item;
        idx += 1;
        const selection = item1.filter(s => s.itemName === item)[0].selection;
        console.log('selection', selection);
        const eachCnt = selection.map((srcStr) => {
            const filtered = survey.filter((userSurvey) => {
                console.log('userSurvey', userSurvey)
                return userSurvey.item1.selection[userSurvey.item1.answer - 1] === srcStr
            }
            );

            console.log('filtered', filtered)

        })

        console.log("eachCnt", eachCnt);
    });

    console.log("makeform2 ", userSelections);
}


function makeForm3(survey) {
    //item2
    // "item2Row": [
    //   {
    //     "rowHead": "교육내용",
    //     "rowspan": 3,
    //     "secondRow": [
    //       {
    //         "str": "교육관정의 학습목표가 분명하게 제시되었다. ",
    //         "choice": 2,
    //         "uuid": "1927bf48-1b23-4b18-8088-cf7d6ce29425"
    //       },
    //       {
    //         "str": "교육과정의 내용이 직무와 관련이 있다.",
    //         "choice": 1,
    //         "uuid": "453851c8-ea27-43e3-8332-3964717dc0f6"
    //       },
    //       {
    //         "str": "교육 수준의 난이도가 적정하였다.",
    //         "choice": 1,
    //         "uuid": "a5b865d1-6bc0-456b-87b4-71f0390b6dd1"
    //       }
    //     ],
    //     "common": [
    //       1,
    //       2,
    //       3,
    //       4,
    //       5
    //     ]
    //   },
    // ... 
    // ]

    // get a user choice of 'item2Row'
    // choice score 1 = 5, ... 5 = 1

    const score = [5, 4, 3, 2, 1];

    console.log('makeform3')
    const result = survey.map((userSurvey) => {
        const item2Row = userSurvey.item2Row;
        const userResult = item2Row.reduce((acc, items, idx) => {
            console.log('items', items);
            const itemResult = items.secondRow.map((item) => {
                const scoreIdx = item.choice - 1;
                return { str: item.str, choice: item.choice, score: score[scoreIdx] }
            });
            acc.push(...itemResult);
            return acc;
        }, []);

        console.log("userResult", userResult);
        return userResult;
    });

    const colHead = ['학습 목표', '직무 관련', '난이도', '교육 구성', '강의시간 배분', '교육 기간', '교수법', '수업내용 이해', '현장자료 활용', '교재', '수강인원', '기자재', '강의 환경', '편의 시설', '학습 목표', '충분한 습득', '업무수행 도움', '적극 추천', '홈페이지', '업무처리', '직원접촉', '직원태도'];

    return { colHead: colHead, score: result };
}


export default async function makeSurveyResult(survey) {

    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");

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

    const wsForm1Data = makeForm1(survey);
    console.log('wsForm1Data', wsForm1Data);
    wsForm1Data.map(({ sex, age, educationLevel, belongs, position, techLevel, yearOfService }, order) => {
        console.log("idx", order)
        wsForm1.addRow({ order: order + 1, sex, age, educationLevel, belongs, position, techLevel, yearOfService })
    })

    //todo: later
    // const wsForm2Data = makeForm2(survey);
    wsForm2.getColumn(1).values = [1, 2, 3, 4, 5];

    const wsForm3Data = makeForm3(survey);
    wsForm3.addRow(['', ...wsForm3Data.colHead, 'avg']);
    wsForm3Data.score.map((userScore, idx) => {
        const score = userScore.map(item => item.score);
        const scoreSum = score.reduce((acc, cur) => acc += cur, 0)
        console.log('score', score, score / score.length)
        wsForm3.addRow([idx, ...score, scoreSum / score.length]);
    });


    const scores = wsForm3Data.score.reduce((acc, userScore) => {
        console.log('userscore', userScore.map(item => item.score))
        acc.push(userScore.map(item => item.score));
        return acc;
    }, []);

    const verticalAvg = [];
    const verticalSum = new Array(scores[0].length).fill(0);
    for (let i = 0; i < scores.length; i++) {
        for (let j = 0; j < scores[i].length; j++) {
            verticalSum[j] += scores[i][j];
        }
    }

    for (let j = 0; j < verticalSum.length; j++) {
        verticalAvg[j] = (verticalSum[j] / scores.length);
    }

    wsForm3.addRow(['avg', ...verticalAvg])

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