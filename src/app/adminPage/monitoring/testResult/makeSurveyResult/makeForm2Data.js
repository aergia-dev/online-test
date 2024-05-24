export default function makeForm2Data(survey) {
    console.log('makeForm2Data');
    console.log('survey', survey);
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


        const selectionMap = selection.reduce((acc, e, idx) => {
            acc.push({
                str: e,
                idx: idx,
                cnt: 0,
                percent: 0

            })
            return acc;
        }, []);

        const userResult = {itemName: item, data: selectionMap};
        console.log('userResult', userResult);

        const filtered = survey.map((userSurvey) => {
            return userSurvey.item1.filter(ele => ele.itemName === item);
        }
        );

        for (let i = 0; i < selection.length; i++) {
            userResult.data[i].cnt = (filtered.filter(item => {
                // console.log("item.answer", item[0].answer, i)
                return item[0].answer.includes(i + 1);
            })).length;
            userResult.data[i].percent = userResult.data[i].cnt / userCnt * 100;
        }

        console.log('userResult', userResult);
        return userResult;
    })

    console.log('result', result);

    console.log("makeform2 ", userSelections);

    return result;
}

