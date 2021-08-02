import styled from "styled-components";
import { useState, useRef, CSSProperties } from "react";
import BeforeSet from "Components/MyOwn/BeforeSet";
import Webcam from "react-webcam";
import ReactPlayer from "react-player";

const MyOwn = () => {
    const [isSet, setIsSet] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("");

    const webcamRef = useRef<Webcam>(null);

    const WebcamStyle: CSSProperties = {
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        objectFit: "cover",
    };

    // test video url
    // https://www.youtube.com/watch?v=-cF7qRKjsXE

    if (!isSet)
        return <BeforeSet setIsSet={setIsSet} setVideoUrl={setVideoUrl} />;

    return (
        <Wrapper>
            <YoutubeWrapper>
                <ReactPlayer url={videoUrl} controls />
            </YoutubeWrapper>

            <WebcamWrapper>
                <Webcam ref={webcamRef} style={WebcamStyle} />
            </WebcamWrapper>
        </Wrapper>
    );
};

export default MyOwn;

const Wrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
`;

const YoutubeWrapper = styled.div`
    position: relative;
    width: 50%;
    height: 100vh;
    overflow: hidden;

    & > * {
        position: absolute;
        top: 0;
        left: 0;
        width: 100% !important;
        height: 100% !important;
    }
`;

const WebcamWrapper = styled.div`
    position: relative;
    width: 50%;
    height: 100vh;

    overflow: hidden;
`;
