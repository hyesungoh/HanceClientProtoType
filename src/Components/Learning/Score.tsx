import { useRecoilValue } from "recoil";
import styled from "styled-components";

import {
    compareCurrentMeanScoreState,
    compareIsPassedState,
    videoCurrentTimeState,
} from "Store";

const Score = () => {
    const videoCurrentTime = useRecoilValue(videoCurrentTimeState);
    const currentMeanScore = useRecoilValue(compareCurrentMeanScoreState);
    const compareIsPassed = useRecoilValue(compareIsPassedState);

    return (
        <Wrapper>
            <div>currentTime : {videoCurrentTime}</div>
            <div>meanScore : {currentMeanScore}</div>
            <div>isPass : {compareIsPassed ? "TRUE" : "FALSE"}</div>
        </Wrapper>
    );
};

export default Score;

const Wrapper = styled.section`
    position: absolute;
    bottom: 12px;
    right: 12px;

    padding: 10px 14px;
    background-color: #dce2f0;
`;
