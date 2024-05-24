import { avg, verticalAvg, repeatArr } from './calcFn'

//             "item3Row": [
//               {
//                 "str": "수로측량",
//                 "choice": [
//                   2,
//                   1,
//                   1,
//                   3
//                 ],
//                 "uuid": "345b3a5b-3a73-484a-920e-53cd3bf2407a"
//               },
//               {
//                 "str": "해양지구 물리탐사",
//                 "choice": [
//                   3,
//                   2,
//                   2,
//                   2
//                 ],
//                 "uuid": "13a8cf30-2105-49c0-b96f-aa99baebff68"
//               },
//               {
//                 "str": "전자해도",
//                 "choice": [
//                   4,
//                   3,
//                   3,
//                   1
//                 ],
//                 "uuid": "a6932f97-1720-43ce-a2a7-f58bbecdaa21"
//               },
//               {
//                 "str": "해양 조사법규",
//                 "choice": [
//                   5,
//                   4,
//                   4,
//                   2
//                 ],
//                 "uuid": "4bee9076-7991-4f72-a6cf-42646fcb6a1e"
//               },
//               {
//                 "str": "전자해도",
//                 "choice": [
//                   1,
//                   5,
//                   5,
//                   3
//                 ],
//                 "uuid": "ae220002-b980-4387-bdee-8f5666dc2e00"
//               },
//               {
//                 "str": "해양 조사법규",
//                 "choice": [
//                   2,
//                   4,
//                   4,
//                   4
//                 ],
//                 "uuid": "74195d3d-d562-491a-86be-ad3c41e9a21e"
//               },
//               {
//                 "str": "해양 조사정책",
//                 "choice": [
//                   3,
//                   3,
//                   3,
//                   5
//                 ],
//                 "uuid": "43c99ffa-6058-4615-acbc-3b4f5385b05d"
//               },
//               {
//                 "str": "해양 공간정보",
//                 "choice": [
//                   5,
//                   2,
//                   2,
//                   4
//                 ],
//                 "uuid": "2517c2db-536c-4583-abd4-ff9431bb67d8"
//               },
//               {
//                 "str": "해양관측",
//                 "choice": [
//                   1,
//                   1,
//                   1,
//                   3
//                 ],
//                 "uuid": "4c0bbb96-efbb-4977-88d1-10ec261102f4"
//               },
//               {
//                 "str": "항해용 간행물",
//                 "choice": [
//                   2,
//                   5,
//                   2,
//                   2
//                 ],
//                 "uuid": "05d595f7-eecc-48a7-950b-0285dce1540b"
//               },
//               {
//                 "str": "현장실습",
//                 "choice": [
//                   3,
//                   3,
//                   3,
//                   1
//                 ],
//                 "uuid": "4460ef20-a087-4d25-b0f8-d15ab96039ce"
//               },
//               {
//                 "str": "해양예보",
//                 "choice": [
//                   4,
//                   4,
//                   5
//                 ],
//                 "uuid": "b21541e7-d448-42ac-87b2-da7ce4ebb584"
//               }
export default function makeForm4Data(survey) {
    console.log('makeForm4Data');
    const score = [5, 4, 3, 2, 1];

    const colHead = ['강의 전문성', '강의기술', '강의태도', '참여도 제고'];

    //item3Row choice
    const userScore = survey.map((userSurvey) => {
        const item3Row = userSurvey.item3Row;
        const userResult = item3Row.reduce((acc, item) => {
            const userScore = item.choice.map(v => score[v - 1]);
            acc.push(...userScore);
            return acc;
        }, [])

        console.log('userResult', userResult)
        return [...userResult, avg(userResult)];
    })

    const col1stHead = survey[0].item3Row.reduce((acc, item) => {
        acc.push(item.str);
        return acc;
    }, []);

    const col2ndHead = repeatArr(colHead, col1stHead.length);
    const verAvg = verticalAvg(userScore);
    const userScoreWithIdx = userScore.map((score, idx)=> [idx, ...score]);
    userScoreWithIdx.push(verAvg);

    return {
        col1stHead: col1stHead,
        col2ndHead: ['', ...col2ndHead, 'avg'],
        score: userScoreWithIdx};
}