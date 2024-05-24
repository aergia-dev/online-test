

export default function makeForm1Data(survey) {
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
