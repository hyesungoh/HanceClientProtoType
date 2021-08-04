import { Dispatch, SetStateAction } from "react";
import ReactPlayer from "react-player";
import styled, { CSSProperties } from "styled-components";

import weride2VideoSrc from "Static/Video/weride2.mp4";
import { useRef } from "react";
import { useSetRecoilState } from "recoil";
import { videoCurrentTimeState } from "Store";

interface IVideo {
    playbackRate: number;
    isStartCompare: boolean;
}

const Video = ({ playbackRate, isStartCompare }: IVideo) => {
    const WebcamStyle: CSSProperties = {
        position: "absolute",
        top: "0",
        left: "0",
    };

    const videoRef = useRef<ReactPlayer>(null);
    const setVideoCurrentTime = useSetRecoilState(videoCurrentTimeState);

    const handleStart = () => {
        setInterval(() => {
            if (!videoRef.current) return;

            const tTime = videoRef.current?.getCurrentTime();
            setVideoCurrentTime(tTime);
        }, 1000);
    };
    return (
        <VideoWrapper>
            <ReactPlayer
                ref={videoRef}
                url={weride2VideoSrc}
                // url={danceVideoSrc}
                volume={0.0}
                style={WebcamStyle}
                controls={!isStartCompare}
                playsinline={true}
                playing={isStartCompare}
                width="100%"
                height="100%"
                playbackRate={playbackRate}
                onStart={handleStart}
            />
        </VideoWrapper>
    );
};

export default Video;

const VideoWrapper = styled.div`
    width: auto;
    height: auto;
`;
