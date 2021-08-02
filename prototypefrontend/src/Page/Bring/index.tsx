import styled from "styled-components";
import { useState } from "react";
import BeforeSet from "Components/MyOwn/BeforeSet";

const MyOwn = () => {
    const [isSet, setIsSet] = useState<boolean>(false);
    const [videoUrl, setVideoUrl] = useState<string>("");

    if (!isSet)
        return <BeforeSet setIsSet={setIsSet} setVideoUrl={setVideoUrl} />;

    return <Wrapper></Wrapper>;
};

export default MyOwn;

const Wrapper = styled.div`
    position: relative;
    width: 100vw;
    height: 100vh;
    display: flex;
`;
