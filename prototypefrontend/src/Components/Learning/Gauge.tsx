import styled from "styled-components";

const Gauge = () => {
    return (
        <Wrapper>
            <GaugeBar />
        </Wrapper>
    );
};

export default Gauge;

const Wrapper = styled.div`
    width: 40px;
    height: 100%;
    background-color: black;

    display: flex;
    align-items: flex-end;
`;

const GaugeBar = styled.div`
    width: 100%;
    height: 100%;
    background-color: red;
`;
