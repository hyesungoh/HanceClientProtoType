import ReactPlayer from "react-player";
import { Slider, SliderProps } from "@material-ui/core";

import { SetStateAction, Dispatch, RefObject } from "react";

interface IControllers {
    currentTime: number;
    setCurrentTime: Dispatch<SetStateAction<number>>;
    endTime: number;
    youtubeRef: RefObject<ReactPlayer>;
    userVideoRef: RefObject<ReactPlayer>;
}

const Controllers = ({
    currentTime,
    setCurrentTime,
    endTime,
    youtubeRef,
    userVideoRef,
}: IControllers) => {
    // const [tempValue, setTempValue] = useState<number>(0);
    const onChange = (
        _: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        setCurrentTime(value as number);
    };

    const onChangeCommitted = (
        _: React.ChangeEvent<SliderProps>,
        value: number | number[]
    ) => {
        const numberValue: number = value as number;
        setCurrentTime(numberValue);
        youtubeRef.current?.seekTo(numberValue);
        userVideoRef.current?.seekTo(numberValue);
    };

    const valueLabelFormat = (value: number) => {
        return value.toFixed(2);
    };

    return (
        <Slider
            min={0}
            max={endTime}
            step={0.1}
            value={currentTime}
            onChange={onChange}
            onChangeCommitted={onChangeCommitted}
            valueLabelDisplay={"on"}
            valueLabelFormat={valueLabelFormat}
        />
    );
};

export default Controllers;
