import React, { Dispatch, SetStateAction, FormEvent } from "react";
import styled from "styled-components";

import {
    Button,
    Select,
    MenuItem,
    InputLabel,
    SelectProps,
} from "@material-ui/core";
import SelectItem from "./Handler/SelectItem";

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

    isStartCompare: boolean;
    setIsStartCompare: Dispatch<SetStateAction<boolean>>;
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
    isStartCompare,
    setIsStartCompare,
}: IHandler) => {
    const onArchitectureChange = (e: FormEvent<SelectProps>) => {
        const { value } = e.target as HTMLOptionElement;
        if (value === "ResNet50" || value === "MobileNetV1")
            setPosenetArchitecture(value);
    };

    const onDetectTimeChange = (e: FormEvent<SelectProps>) => {
        const { value } = e.target as HTMLOptionElement;
        setDetectTime(parseInt(value));
    };

    const onWidthChange = (e: FormEvent<SelectProps>) => {
        const { value } = e.target as HTMLOptionElement;
        setResolution({ ...resolution, width: parseInt(value) });
    };

    const onHeightChange = (e: FormEvent<SelectProps>) => {
        const { value } = e.target as HTMLOptionElement;
        setResolution({ ...resolution, height: parseInt(value) });
    };

    const onOutputStrideChange = (e: FormEvent<SelectProps>) => {
        const { value } = e.target as HTMLOptionElement;
        const numValue = parseInt(value);

        if (numValue === (8 || 16 || 32)) {
            setOutputStride(numValue);
        }
    };

    const onKeypointConfidenceChange = (e: FormEvent<SelectProps>) => {
        const { value } = e.target as HTMLOptionElement;
        setKeyPointConfidence(parseFloat(value));
    };

    const onSkeletonConfidenceChange = (e: FormEvent<SelectProps>) => {
        const { value } = e.target as HTMLOptionElement;
        setSkeletonConfidence(parseFloat(value));
    };

    const onPlaybackRateChange = (e: FormEvent<SelectProps>) => {
        const { value } = e.target as HTMLOptionElement;
        setPlaybackRate(parseFloat(value));
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
                inputLabel="Detect Time"
                id="detectTime"
                value={detectTime}
                onChange={onDetectTimeChange}
                menuItems={[33, 50, 60, 70, 80, 90, 100, 200, 300, 400, 490]}
            />

            <SelectItem
                inputLabel="Resolution - Width"
                id="resolutionWidth"
                value={resolution.width}
                onChange={onWidthChange}
                menuItems={[200, 300, 400, 500, 600, 700, 800, 900]}
            />

            <SelectItem
                inputLabel="Resolution - Height"
                id="resolutionHeight"
                value={resolution.height}
                onChange={onHeightChange}
                menuItems={[200, 300, 400, 500, 600, 700, 800, 900]}
            />

            <SelectItem
                inputLabel="Output Stride"
                id="outputStride"
                value={outputStride}
                onChange={onOutputStrideChange}
                menuItems={[8, 16, 32]}
            />

            <SelectItem
                inputLabel="Keypoint Confidence"
                id="keypointConfidence"
                value={keypointConfidence}
                onChange={onKeypointConfidenceChange}
                menuItems={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}
            />

            <SelectItem
                inputLabel="Skeleton Confidence"
                id="skeletonConfidence"
                value={skeletonConfidence}
                onChange={onSkeletonConfidenceChange}
                menuItems={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]}
            />

            <SelectItem
                inputLabel="Playback Rate"
                id="playbackRate"
                value={playbackRate}
                onChange={onPlaybackRateChange}
                menuItems={[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]}
            />

            {isStartCompare ? (
                ""
            ) : (
                <Button
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
    top: 0;
    right: 12px;

    width: 500px;

    padding: 10px 14px;
    background-color: #dce2f0;
`;

const SelectWrapper = styled.div`
    color: #50586c;
`;

const StartBtn = styled.button`
    all: unset;
    width: 100%;
    height: 40px;
    background-color: #50586c;
    cursor: pointer;

    text-align: center;
    color: #dce2f0;

    &:hover {
        color: #50586c;
        background-color: #dce2f0;
    }
`;
