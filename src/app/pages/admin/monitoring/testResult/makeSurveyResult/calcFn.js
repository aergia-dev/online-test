export function avg(scoreArr) {
    return scoreArr.reduce((acc, cur) => acc +=cur, 0) / scoreArr.length;
} 

export function verticalAvg(scoreArr) {
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

export function repeatArr(arr, times) {
    return new Array(times).fill(arr).flatMap(x => x)
}