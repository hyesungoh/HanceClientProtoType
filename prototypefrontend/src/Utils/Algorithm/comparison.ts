import { IFrame, IResult } from "Utils/Algorithm";

const BODY_JOINT_NUM = 17;

const calculateConsineSimilarity = (
    userFrame: IFrame,
    serverFrame: IFrame
): number => {
    const userKeypoints = userFrame["keypoints"];
    const serverKeypoints = serverFrame["keypoints"];

    let sArray = [];
    let uArray = [];
    for (let i = 5; i < BODY_JOINT_NUM; i++) {
        sArray.push(serverKeypoints[i * 2]);
        sArray.push(serverKeypoints[i * 2 + 1]);
        uArray.push(userKeypoints[i * 2]);
        uArray.push(userKeypoints[i * 2 + 1]);
    }
    const temp =
        calculateDot(sArray, uArray, 1) /
        (calculateNorm(sArray) * calculateNorm(uArray));
    const score = ((2 - Math.sqrt(2 * (1 - temp))) / 2) * 100;

    return score;
};

const calculateDot = (
    array1: number[],
    array2: number[],
    ndarray: number
): number => {
    if (ndarray == 1) {
        let answer = 0;
        const len = Math.min(array1.length, array2.length);
        for (let i = 0; i < len; i++) {
            answer += array1[i] * array2[i];
        }
        return answer;
    }
    return 0;
};

const calculateNorm = (numbers: number[]) => {
    const powerSum = numbers.reduce((acc: number, cur: number): number => {
        return acc + Math.pow(cur, 2);
    }, 0);
    return Math.sqrt(powerSum);
};

const compareFrames = (
    userFrames: IFrame[],
    serverFrames: IFrame[],
    passingAccuracy: number,
    framefilteringAccuracy: number
): IResult => {
    const result: IResult = {
        isEvaluated: false,
        isPassed: false,
        meanScore: 0,
        underScoreFrames: [],
    };
    if (userFrames.length == 0 || serverFrames.length == 0) {
        return result;
    }
    let sumHighestScore = 0;
    for (let i = 0; i < userFrames.length; i++) {
        let lowestScore = 100;
        let highestScore = 0;
        let lowestScoreFrame: IFrame = {
            frameId: 0,
            keypoints: [],
            box: [],
        };
        const userFrame = userFrames[i];
        for (let j = 0; j < serverFrames.length; j++) {
            const serverFrame = serverFrames[j];
            const tempScore = calculateConsineSimilarity(
                userFrame,
                serverFrame
            );

            if (isNaN(tempScore)) {
                continue;
            }
            if (tempScore >= passingAccuracy) {
                result.isPassed = true;
            }
            if (lowestScore > tempScore) {
                lowestScore = tempScore;
                lowestScoreFrame = userFrame;
            }
            if (highestScore < tempScore) {
                highestScore = tempScore;
            }
        }
        if (lowestScore < framefilteringAccuracy) {
            result.underScoreFrames.push(lowestScoreFrame);
        }
        sumHighestScore += highestScore;
    }
    result.isEvaluated = true;
    result.meanScore = sumHighestScore / userFrames.length;
    return result;
};

export default compareFrames;
