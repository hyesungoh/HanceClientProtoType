import styled from "styled-components";
import ReactPlayer from "react-player";
import { video2Src } from "Static/Video/10.mp4";

const Analysis = () => {
    return (
        <Wrapper>
            <VideoWrapper>
                <ReactPlayer
                    url="https://www.youtube.com/watch?v=5HdXsaQf94k"
                    controls
                />
            </VideoWrapper>
        </Wrapper>
    );
};

export default Analysis;

const Wrapper = styled.main`
    width: 100vw;
    height: 100vh;

    display: flex;
`;

const VideoWrapper = styled.div`
    position: relative;
    width: 500px;
    height: 100vh;
    overflow: hidden;

    & > * {
        position: absolute;
        width: 100% !important;
        height: 100% !important;
    }
`;
