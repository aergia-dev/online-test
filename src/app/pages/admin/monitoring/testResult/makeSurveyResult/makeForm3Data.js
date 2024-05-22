export default function makeForm3Data(survey) {
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
                // return { str: item.str, choice: item.choice, score: score[scoreIdx] }
                return score[scoreIdx]; 
            });
            acc.push(...itemResult);
            return acc;
        }, []);

        console.log("userResult", userResult);
        return [...userResult, avg(userResult)];
    });

    const colHead = ['', '학습 목표', '직무 관련', '난이도', '교육 구성', '강의시간 배분', '교육 기간', '교수법', '수업내용 이해', '현장자료 활용', '교재', '수강인원', '기자재', '강의 환경', '편의 시설', '학습 목표', '충분한 습득', '업무수행 도움', '적극 추천', '홈페이지', '업무처리', '직원접촉', '직원태도', 'avg'];
    const aAvg = verticalAvg(result);
    const resultWithIdx = result.map((r, idx ) => [idx, ...r]);
    resultWithIdx.push(aAvg);

    return { colHead: colHead, score: resultWithIdx };
}

function avg(scoreArr) {
    return scoreArr.reduce((acc, cur) => acc +=cur, 0) / scoreArr.length;
} 

function verticalAvg(scoreArr) {
    const verticalAvg = [];
    const verticalSum = new Array(scoreArr[0].length).fill(0);

    for (let i = 0; i < scoreArr.length; i++) {
        for (let j = 0; j < scoreArr[i].length; j++) {
            verticalSum[j] += scoreArr[i][j];
        }
    }

    for (let j = 0; j < verticalSum.length; j++) {
        verticalAvg[j] = (verticalSum[j] / scoreArr.length);
    }

    return ['avg', ...verticalAvg];
}

