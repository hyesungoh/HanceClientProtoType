import { Dispatch, SetStateAction } from "react";
import ReactPlayer from "react-player";
import styled, { CSSProperties } from "styled-components";

import danceVideoSrc from "Static/Video/10.mp4";
import weride2VideoSrc from "Static/Video/weride2.mp4";
import { useRef } from "react";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { videoCurrentTimeState } from "Store";

interface IVideo {
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    playbackRate: number;
    setPlaybackRate: Dispatch<SetStateAction<number>>;
    isStartCompare: boolean;
}

const Video = ({
    isPlaying,
    setIsPlaying,
    playbackRate,
    setPlaybackRate,
    isStartCompare,
}: IVideo) => {
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
                volume={0.3}
                style={WebcamStyle}
                controls={true}
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
