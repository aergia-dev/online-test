export default function makeForm2Data(survey) {
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

