import { useState } from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { compareCurrentMeanScoreState } from "Store";
import styled from "styled-components";

const Gauge = () => {
    const [gaugeHeight, setGaugeHeight] = useState<number>(0);
    const currentMeanScore = useRecoilValue(compareCurrentMeanScoreState);

    useEffect(() => {
        setGaugeHeight((currentMeanScore - 60) * 2.5);
    }, [currentMeanScore]);

    return (
        <Wrapper>
            <GaugeBar gaugeHeight={gaugeHeight} />
        </Wrapper>
    );
};

export default Gauge;

const Wrapper = styled.div`
    width: 40px;
    height: 100%;
    background-color: black;

    display: flex;
    align-items: flex-end;
`;

const GaugeBar = styled.div<{ gaugeHeight: number }>`
    width: 100%;
    height: 100%;
    background-color: ${({ gaugeHeight }) => {
        if (gaugeHeight > 80) return "blue";
        else if (gaugeHeight > 50) return "green";
        else if (gaugeHeight > 30) return "orange";
        else return "red";
    }};

    transition: transform 0.9s, background-color 0.9s;
    transform-origin: bottom;
    transform: ${({ gaugeHeight }) => `scaleY(${gaugeHeight}%)`};
`;
