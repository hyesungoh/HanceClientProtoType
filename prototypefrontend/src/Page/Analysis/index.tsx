import styled from "styled-components";
import ReactPlayer from "react-player";
import { video2Src } from "Static/Video/10.mp4";

const Analysis = () => {
    return (
        <Wrapper>
            <ReactPlayer url="https://www.youtube.com/watch?v=5HdXsaQf94k" />
        </Wrapper>
    );
};

export default Analysis;

const Wrapper = styled.main`
    width: 100vw;
    height: 100vh;
`;
