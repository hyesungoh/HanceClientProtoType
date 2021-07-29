import { Link } from "react-router-dom";

import { Button } from "@material-ui/core";
import styled from "styled-components";

const Home = () => {
    return (
        <Wrapper>
            <Button
                size="large"
                style={{ fontSize: "10rem", color: "#50586C" }}
            >
                Wavy
            </Button>
            <BtnWrapper>
                <Link to="/learning">
                    <Button variant="contained">배우기</Button>
                </Link>
                <Button variant="contained">분석</Button>
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
