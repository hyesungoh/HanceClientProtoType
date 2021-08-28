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

interface IThumbnail {
    isShowing: boolean;
    pos: { x: number; y: number };
    isPlaying: boolean;
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
    const [thumbnailConfig, setThumbnailConfig] = useState<IThumbnail>({
        isShowing: false,
        pos: { x: 0, y: 0 },
        isPlaying: true,
    });

    // 컨트롤러 드래그 시
    const onChange = (
        e: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        const mouseEvent = e as MouseEvent;
        setCurrentTime(value as number);
        setThumbnailConfig({
            isShowing: true,
            isPlaying: false,
            pos: { x: mouseEvent.pageX, y: mouseEvent.pageY },
        });
        ThumbnailVideoRef.current?.seekTo(value as number);
    };

    // 시점 이동 시
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
        setThumbnailConfig({
            ...thumbnailConfig,
            isShowing: false,
            isPlaying: true,
        });
    };

    return (
        <ControllerWrapper>
            <ThumbnailWrapper thumbnailConfig={thumbnailConfig}>
                <ReactPlayer
                    url={videoUrl}
                    ref={ThumbnailVideoRef}
                    playing={thumbnailConfig.isPlaying}
                    volume={0}
                />
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

const ThumbnailWrapper = styled.div<{ thumbnailConfig: IThumbnail }>`
    position: absolute;
    top: -110%;
    left: calc(${({ thumbnailConfig }) => thumbnailConfig.pos.x}px - 30px);
    width: 100px;
    height: 150px;

    opacity: ${({ thumbnailConfig }) =>
        thumbnailConfig.isShowing ? "1" : "0"};

    & > * {
        width: 100% !important;
        height: 100% !important;
    }
`;
