import styled from "styled-components";
import { Button, TextField, TextFieldProps } from "@material-ui/core";
import React from "react";
import { useRef } from "react";

interface IBeforeSet {
    setIsSet: React.Dispatch<React.SetStateAction<boolean>>;
    setVideoUrl: React.Dispatch<React.SetStateAction<string>>;
}

const BeforeSet = ({ setIsSet, setVideoUrl }: IBeforeSet) => {
    const textRef = useRef<HTMLInputElement>(null);

    const onSubmit = () => {
        setVideoUrl(textRef.current?.value as string);
        setIsSet(true);
    };

    return (
        <Wrapper>
            <BtnWrapper>
                <TextField
                    inputRef={textRef}
                    id="outlined-basic"
                    label="Youtube video url"
                    variant="outlined"
                    fullWidth={true}
                />

                <Button variant="contained" onClick={onSubmit}>
                    제출
                </Button>
            </BtnWrapper>
        </Wrapper>
    );
};

export default BeforeSet;

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BtnWrapper = styled.div`
    width: 500px;
    display: flex;
    gap: 12px;
`;
