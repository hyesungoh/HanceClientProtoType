import { Dispatch, SetStateAction } from "react";
import ReactPlayer from "react-player";
import { CSSProperties } from "styled-components";

import danceVideoSrc from "Static/Video/10.mp4";
import weride2VideoSrc from "Static/Video/weride2.mp4";

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

    return (
        <ReactPlayer
            url={weride2VideoSrc}
            // url={danceVideoSrc}
            volume={0.3}
            style={WebcamStyle}
            controls={!isStartCompare}
            playing={isStartCompare}
            width="100%"
            height="100%"
            mi
            playbackRate={playbackRate}
        />
    );
};

export default Video;
