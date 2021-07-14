import React, { Dispatch, SetStateAction } from "react";

interface IHandler {
    setDetectTime: Dispatch<SetStateAction<number>>;
    setPosenetArchitecture: Dispatch<
        SetStateAction<"ResNet50" | "MobileNetV1">
    >;
    setOutputStride: Dispatch<SetStateAction<32 | 16 | 8>>;
    setResolution: Dispatch<SetStateAction<{ width: number; height: number }>>;
}

const Handler = ({
    setDetectTime,
    setPosenetArchitecture,
    setOutputStride,
    setResolution,
}: IHandler) => {
    return <div></div>;
};

export default Handler;
