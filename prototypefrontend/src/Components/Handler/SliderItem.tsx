import React from "react";
import styled from "styled-components";
import { Slider, Typography, SliderProps } from "@material-ui/core";

interface ISliderItem {
    id: string;
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onSlideChange: (
        e: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => void;
}

const SliderItem = ({
    id,
    label,
    value,
    min,
    max,
    step,
    onSlideChange,
}: ISliderItem) => {
    return (
        <Wrapper>
            <Typography id={id} gutterBottom>
                {label}
            </Typography>
            <Slider
                defaultValue={value}
                aria-labelledby={id}
                valueLabelDisplay="auto"
                step={step}
                marks
                min={min}
                max={max}
                onChangeCommitted={onSlideChange}
            />
        </Wrapper>
    );
};

export default SliderItem;

const Wrapper = styled.div`
    width: 100%;
`;
