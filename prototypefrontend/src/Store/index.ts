import { atom } from "recoil";

export const videoCurrentTimeState = atom<number>({
    default: 0,
    key: "videoCurrentTImeState",
});

export const compareCurrentMeanScoreState = atom<number>({
    default: 0,
    key: "compareCurrentMeanScoreState",
});

export const compareIsPassedState = atom<boolean>({
    default: false,
    key: "compareIsPassedState",
});
