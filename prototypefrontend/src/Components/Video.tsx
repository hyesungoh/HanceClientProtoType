import ReactPlayer from "react-player";
import { CSSProperties } from "styled-components";

import danceVideoSrc from "Static/Video/5.mp4";

const Video = () => {
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
            width="100%"
            height="100%"
        />
    );
};

export default Video;
