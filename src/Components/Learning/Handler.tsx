import React, { Dispatch, SetStateAction, FormEvent } from "react";
import styled from "styled-components";

import { Button, SelectProps, SliderProps } from "@material-ui/core";
import SelectItem from "Components/Learning/SelectItem";
import SliderItem from "Components/Learning/SliderItem";
import { useRecoilState } from "recoil";
import { isStartCompareState } from "Store";

interface IHandler {
    detectTime: number;
    setDetectTime: Dispatch<SetStateAction<number>>;

    posenetArchitecture: "ResNet50" | "MobileNetV1";
    setPosenetArchitecture: Dispatch<
        SetStateAction<"ResNet50" | "MobileNetV1">
    >;

    outputStride: 32 | 16 | 8;
    setOutputStride: Dispatch<SetStateAction<32 | 16 | 8>>;

    resolution: { width: number; height: number };
    setResolution: Dispatch<SetStateAction<{ width: number; height: number }>>;

    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;

    playbackRate: number;
    setPlaybackRate: Dispatch<SetStateAction<number>>;

    keypointConfidence: number;
    setKeyPointConfidence: Dispatch<SetStateAction<number>>;

    skeletonConfidence: number;
    setSkeletonConfidence: Dispatch<SetStateAction<number>>;
}

const Handler = ({
    detectTime,
    setDetectTime,
    posenetArchitecture,
    setPosenetArchitecture,
    outputStride,
    setOutputStride,
    resolution,
    setResolution,
    isPlaying,
    setIsPlaying,
    playbackRate,
    setPlaybackRate,
    keypointConfidence,
    setKeyPointConfidence,
    skeletonConfidence,
    setSkeletonConfidence,
}: IHandler) => {
    const [isStartCompare, setIsStartCompare] =
        useRecoilState(isStartCompareState);

    const onArchitectureChange = (e: FormEvent<SelectProps>) => {
        const { value } = e.target as HTMLOptionElement;
        if (value === "ResNet50" || value === "MobileNetV1")
            setPosenetArchitecture(value);
    };

    const onOutputStrideChange = (e: FormEvent<SelectProps>) => {
        const { value } = e.target as HTMLOptionElement;
        const numValue = parseInt(value);

        if (numValue === 8 || numValue === 16) {
            setOutputStride(numValue);
        } else if (numValue === 32 && posenetArchitecture === "ResNet50") {
            setOutputStride(numValue);
        } else {
            alert("지원하지 않는 항목입니다.");
        }
    };

    const onDetectTimeChange = (
        _: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        setDetectTime(value as number);
    };

    const onResolutionChange = (
        _: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        setResolution({ width: value as number, height: value as number });
    };

    const onKeypointConfidenceChange = (
        _: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        setKeyPointConfidence(value as number);
    };

    const onSkeletonConfidenceChange = (
        _: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        setSkeletonConfidence(value as number);
    };

    const onPlaybackRateChange = (
        _: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        setPlaybackRate(value as number);
    };

    const onStartClick = () => {
        setTimeout(() => {
            setIsStartCompare(true);
        }, 3000);
    };
    return (
        <Wrapper>
            <SelectItem
                inputLabel="Architecture"
                id="architecture"
                value={posenetArchitecture}
                onChange={onArchitectureChange}
                menuItems={["MobileNetV1", "ResNet50"]}
            />

            <SelectItem
                inputLabel="Output Stride"
                id="outputStride"
                value={outputStride}
                onChange={onOutputStrideChange}
                menuItems={[8, 16, 32]}
            />

            <SliderItem
                id="detectTime"
                label="Detect Time"
                value={detectTime}
                onChange={onDetectTimeChange}
                min={35}
                max={1000}
                step={50}
            />

            <SliderItem
                id="resolution"
                label="Resolution"
                value={resolution.width}
                onChange={onResolutionChange}
                min={200}
                max={900}
                step={100}
            />

            <SliderItem
                id="keypointConfidence"
                label="Keypoint Confidence"
                value={keypointConfidence}
                onChange={onKeypointConfidenceChange}
                min={0.1}
                max={0.9}
                step={0.1}
            />

            <SliderItem
                id="skeletonConfidence"
                label="Skeleton Confidence"
                value={skeletonConfidence}
                onChange={onSkeletonConfidenceChange}
                min={0.1}
                max={0.9}
                step={0.1}
            />

            <SliderItem
                id="playbackRate"
                label="Playback Rate"
                value={playbackRate}
                onChange={onPlaybackRateChange}
                min={0.1}
                max={1}
                step={0.1}
            />

            {isStartCompare ? (
                ""
            ) : (
                <Button
                    color="primary"
                    variant="contained"
                    style={{ width: "100%" }}
                    onClick={onStartClick}
                >
                    START
                </Button>
            )}
        </Wrapper>
    );
};

export default Handler;

const Wrapper = styled.section`
    position: absolute;
    top: 12pxs;
    right: 12px;

    width: 300px;
    padding: 10px 14px;
    background-color: #dce2f0;
    border-radius: 12px;
`;
