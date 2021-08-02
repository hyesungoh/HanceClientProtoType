import styled from "styled-components";
import { Button, TextField } from "@material-ui/core";

interface IBeforeSet {}

const BeforeSet = () => {
    return (
        <Wrapper>
            <BtnWrapper>
                <TextField
                    id="outlined-basic"
                    label="Outlined"
                    variant="outlined"
                    fullWidth={true}
                />

                <Button variant="contained">제출</Button>
            </BtnWrapper>
        </Wrapper>
    );
};

export default BeforeSet;

const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BtnWrapper = styled.div`
    width: 40%;
    display: flex;
    gap: 12px;
`;
