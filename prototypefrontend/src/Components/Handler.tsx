import React, { Dispatch, SetStateAction } from "react";

interface IHandler {
    detectTime: number;
    setDetectTime: Dispatch<SetStateAction<number>>;

    posenetArchitecture: "ResNet50" | "MobileNetV1";
    setPosenetArchitecture: Dispatch<
        SetStateAction<"ResNet50" | "MobileNetV1">
    >;

    outputStride: 32 | 16 | 8;
    setOutputStride: Dispatch<SetStateAction<32 | 16 | 8>>;

    resolution: { width: number; height: number };
    setResolution: Dispatch<SetStateAction<{ width: number; height: number }>>;
}

const Handler = ({
    detectTime,
    setDetectTime,
    posenetArchitecture,
    setPosenetArchitecture,
    outputStride,
    setOutputStride,
    resolution,
    setResolution,
}: IHandler) => {
    return (
        <div>
            <select value={posenetArchitecture}>
                <option
                    onClick={() => {
                        setPosenetArchitecture("MobileNetV1");
                    }}
                >
                    MobileNetV1
                </option>
                <option
                    onClick={() => {
                        setPosenetArchitecture("ResNet50");
                    }}
                >
                    ResNet50
                </option>
            </select>


            <select>
                
            </select>
        </div>
    );
};

export default Handler;
