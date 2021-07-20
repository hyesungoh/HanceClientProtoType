export interface IFrame {
    frameId: number;
    keypoints: number[];
    box: number[];
}

export interface IResult {
    isEvaluated: boolean;
    isPassed: boolean;
    meanScore: number;
    underScoreFrames: Frame[];
}
