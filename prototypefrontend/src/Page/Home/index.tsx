import { Link } from "react-router-dom";

import { Button, TextField } from "@material-ui/core";
import styled from "styled-components";

const Home = () => {
    return (
        <Wrapper>
            <Button
                size="large"
                style={{
                    fontSize: "10rem",
                    color: "#50586C",
                    marginBottom: "12px",
                }}
            >
                Wavy
            </Button>
            <BtnWrapper>
                <Link to="/learning">
                    <Button variant="contained">배우기</Button>
                </Link>
                <Link to="/analysis">
                    <Button variant="contained">분석</Button>
                </Link>
                <Link to="/myown">
                    <Button variant="contained">나만의 분석</Button>
                </Link>
            </BtnWrapper>
        </Wrapper>
    );
};

export default Home;

const Wrapper = styled.main`
    width: 100vw;
    height: 100vh;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const BtnWrapper = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 12px;
`;
