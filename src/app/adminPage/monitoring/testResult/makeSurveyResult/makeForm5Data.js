
export default function makeForm5Data(survey) {
    console.log('makeForm5Data');
    const userOpinion = survey.map((userSurvey, idx) =>
        [idx, userSurvey.item4Input]);

    return {
        head: '교육 과정 운영에 대한 개선 사항',
        content: userOpinion
    };
}