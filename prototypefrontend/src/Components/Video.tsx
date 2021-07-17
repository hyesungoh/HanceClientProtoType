import { Dispatch, SetStateAction } from "react";
import ReactPlayer from "react-player";
import { CSSProperties } from "styled-components";

import danceVideoSrc from "Static/Video/5.mp4";

interface IVideo {
    isPlaying: boolean;
    setIsPlaying: Dispatch<SetStateAction<boolean>>;
    playbackRate: number;
    setPlaybackRate: Dispatch<SetStateAction<number>>;
}

const Video = ({
    isPlaying,
    setIsPlaying,
    playbackRate,
    setPlaybackRate,
}: IVideo) => {
    const WebcamStyle: CSSProperties = {
        position: "absolute",
        top: "0",
        left: "0",
    };

    return (
        <ReactPlayer
            url={danceVideoSrc}
            volume={0.3}
            style={WebcamStyle}
            // controls
            // playing
            width="100%"
            height="100%"
            playbackRate={playbackRate}
        />
    );
};

export default Video;
