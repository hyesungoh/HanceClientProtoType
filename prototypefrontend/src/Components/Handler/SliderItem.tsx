import React from "react";
import styled from "styled-components";
import { Slider, Typography, SliderProps } from "@material-ui/core";
import { useState } from "react";

interface ISliderItem {
    id: string;
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    onChange: (
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
    onChange,
}: ISliderItem) => {
    const [tempValue, setTempValue] = useState<number>(value);

    const onEveryChange = (
        _: React.ChangeEvent<SliderProps>,
        currentValue: number | number[]
    ) => {
        setTempValue(currentValue as number);
    };

    return (
        <Wrapper>
            <Typography id={id} gutterBottom>
                {label}
            </Typography>
            <Slider
                value={tempValue}
                aria-labelledby={id}
                valueLabelDisplay="auto"
                step={step}
                marks
                min={min}
                max={max}
                onChange={onEveryChange}
                onChangeCommitted={onChange}
            />
        </Wrapper>
    );
};

export default SliderItem;

const Wrapper = styled.div`
    width: 100%;
`;
