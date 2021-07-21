import { atom } from "recoil";

const videoCurrentTimeState = atom<number>({
    default: 0,
    key: "videoCurrentTImeState",
});

const compareCurrentMeanScoreState = atom<number>({
    default: 0,
    key: "compareCurrentMeanScoreState",
});

const compareIsPassedState = atom<boolean>({
    default: false,
    key: "compareIsPassedState",
});
