import ReactPlayer from "react-player";

import danceVideoSrc from "Static/Video/5.mp4";

const Video = () => {
    return (
        <div>
            <ReactPlayer url={danceVideoSrc} controls={true} />
        </div>
    );
};

export default Video;
