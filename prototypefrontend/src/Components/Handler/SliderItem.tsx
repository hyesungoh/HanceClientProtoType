import React from "react";
import styled from "styled-components";
import { Slider, Typography, SliderProps } from "@material-ui/core";

const SliderItem = () => {
    const onSlideChange = (
        e: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        console.log(value);
    };

    return (
        <Wrapper>
            <Typography id="discrete-slider" gutterBottom>
                Temperature
            </Typography>
            <Slider
                defaultValue={30}
                // getAriaValueText={valuetext}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={5}
                marks
                min={10}
                max={110}
                onChangeCommitted={onSlideChange}
            />
        </Wrapper>
    );
};

export default SliderItem;

const Wrapper = styled.div`
    width: 100%;
`;
