import styled from "styled-components";
import { useState } from "react";
import BeforeSet from "Components/MyOwn/BeforeSet";

const MyOwn = () => {
    const [isSet, setIsSet] = useState<boolean>(true);
    const [videoUrl, setVideoUrl] = useState<string>("");

    return (
        <Wrapper>
            <BeforeSet />
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
