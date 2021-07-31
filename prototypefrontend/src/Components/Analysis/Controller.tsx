import ReactPlayer from "react-player";
import styled from "styled-components";
import { Slider, SliderProps } from "@material-ui/core";

import {
    SetStateAction,
    Dispatch,
    RefObject,
    MouseEvent,
    useState,
} from "react";
import { useRef } from "react";

interface IControllers {
    currentTime: number;
    setCurrentTime: Dispatch<SetStateAction<number>>;
    endTime: number;
    youtubeRef: RefObject<ReactPlayer>;
    userVideoRef: RefObject<ReactPlayer>;
    videoUrl: string;
}

const Controllers = ({
    currentTime,
    setCurrentTime,
    endTime,
    youtubeRef,
    userVideoRef,
    videoUrl,
}: IControllers) => {
    const ThumbnailVideoRef = useRef<ReactPlayer>(null);
    const [isThumbnailShow, setIsThumbnailShow] = useState<boolean>(false);

    const onChange = (
        e: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        setCurrentTime(value as number);
        setIsThumbnailShow(true);
        ThumbnailVideoRef.current?.seekTo(value as number);

    };

    const onChangeCommitted = (
        _: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        const numberValue: number = value as number;
        setCurrentTime(numberValue);
        youtubeRef.current?.seekTo(numberValue);
        userVideoRef.current?.seekTo(numberValue);
    };

    const valueLabelFormat = (value: number) => {
        return value.toFixed(2);
    };

    const onMouseLeave = () => {
        setIsThumbnailShow(false);
    };

    return (
        <ControllerWrapper>
            <ThumbnailWrapper isThumbnailShow={isThumbnailShow}>
                <ReactPlayer url={videoUrl} ref={ThumbnailVideoRef} playing={false} light={true}/>
            </ThumbnailWrapper>

            <Slider
                min={0}
                max={endTime}
                step={0.1}
                value={currentTime}
                onChange={onChange}
                onChangeCommitted={onChangeCommitted}
                valueLabelDisplay={"on"}
                valueLabelFormat={valueLabelFormat}
                onMouseLeave={onMouseLeave}
            />
        </ControllerWrapper>
    );
};

export default Controllers;

const ControllerWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100px;

    display: flex;
    align-items: center;
`;

const ThumbnailWrapper = styled.div<{ isThumbnailShow: boolean }>`
    position: absolute;
    top: -120%;
    left: 0;
    width: 100px;
    height: 150px;

    opacity: ${({ isThumbnailShow }) => (isThumbnailShow ? "1" : "0")};

    & > * {
        width: 100% !important;
        height: 100% !important;
    }
`;
