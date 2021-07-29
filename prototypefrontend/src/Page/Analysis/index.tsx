import { useRef } from "react";
import styled from "styled-components";
import ReactPlayer from "react-player";

import weride2VideoSrc from "Static/Video/weride2.mp4";
import Controllers from "Components/Analysis/Controller";

const Analysis = () => {
    const youtubeRef = useRef<ReactPlayer>(null);
    return (
        <Wrapper>
            <VideoSection>
                <VideoWrapper>
                    <ReactPlayer
                        ref={youtubeRef}
                        url="https://www.youtube.com/watch?v=SZ0UU3Ud3m0"
                        playing
                        progressInterval={200}
                        volume={0}
                        // onProgress={(e) => {
                        //     console.log(e);
                        // }}
                    />
                </VideoWrapper>
                <VideoWrapper>
                    <ReactPlayer
                        ref={youtubeRef}
                        url={weride2VideoSrc}
                        playing
                        progressInterval={200}
                        volume={0}
                        // onProgress={(e) => {
                        //     console.log(e);
                        // }}
                    />
                </VideoWrapper>
            </VideoSection>

            <ControllerWrapper>
                <Controllers />
            </ControllerWrapper>
        </Wrapper>
    );
};

export default Analysis;

const Wrapper = styled.main`
    width: 100vw;
    height: 100vh;

    display: flex;
    align-items: center;
    flex-direction: column;
`;

const VideoSection = styled.section`
    width: 100%;
    display: flex;
    justify-content: center;
`;

const VideoWrapper = styled.div`
    position: relative;
    width: 500px;
    height: 80vh;
    overflow: hidden;

    & > * {
        position: absolute;
        width: 100% !important;
        height: 100% !important;
    }
`;

const ControllerWrapper = styled.div`
    width: 80vw;
`;
