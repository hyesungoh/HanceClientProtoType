import Frame from "./frame";

interface Result {
    isEvaluated: boolean;
    isPassed: boolean;
    meanScore: number;
    underScoreFrames: Frame[];
}

export default Result