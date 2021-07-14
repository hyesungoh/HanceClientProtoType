import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";

import useCoaching from "Hooks/useCoaching";
import { drawKeypoints, drawSkeleton } from "Utils/draw";
import Handler from "./Handler";

interface IDrawResult {
    pose: posenet.Pose;
    videoWidth: number;
    videoHeight: number;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const WebcamWithPosenet = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [detectTime, setDetectTime] = useState<number>(200);
    const [posenetArchitecture, setPosenetArchitecture] = useState<
        "ResNet50" | "MobileNetV1"
    >("ResNet50");
    const [outputStride, setOutputStride] = useState<32 | 16 | 8>(16);

    const [resolution, setResolution] = useState<{
        width: number;
        height: number;
    }>({ width: 240, height: 240 });

    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef(null);

    const { getFeedback } = useCoaching();

    const drawResult = ({
        pose,
        videoWidth,
        videoHeight,
        canvasRef,
    }: IDrawResult) => {
        if (!canvasRef.current) return;

        const ctx = canvasRef.current.getContext("2d");
        if (!ctx) return;

        canvasRef.current.width = videoWidth;
        canvasRef.current.height = videoHeight;

        drawKeypoints({
            keypoints: pose["keypoints"],
            minConfidence: 0.5,
            ctx,
        });
        drawSkeleton({ keypoints: pose["keypoints"], minConfidence: 0.5, ctx });
    };

    const detectWebcamFeed = async (posenetModel: posenet.PoseNet) => {
        if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video?.videoWidth;
            const videoHeight = webcamRef.current.video?.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            const pose = await posenetModel.estimateSinglePose(video);
            const score = await getFeedback({ pose });
            console.log(`예상 점수 : ${score}`);

            drawResult({ pose, videoWidth, videoHeight, canvasRef });
        }
    };

    const runPosenet = async () => {
        setIsLoading(true);
        const posenetModel = await posenet.load({
            inputResolution: {
                width: resolution.width,
                height: resolution.height,
            },
            architecture: posenetArchitecture,
            outputStride: outputStride,
        });
        setIsLoading(false);

        setInterval(() => {
            detectWebcamFeed(posenetModel);
        }, detectTime);
    };

    useEffect(() => {
        runPosenet();

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [posenetArchitecture]);

    if (isLoading) return <div>LOADING ... </div>;

    return (
        <>
            <header>
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

                <Webcam
                    ref={webcamRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        width: resolution.width,
                        height: resolution.height,
                    }}
                />

                <canvas
                    ref={canvasRef}
                    style={{
                        position: "absolute",
                        marginLeft: "auto",
                        marginRight: "auto",
                        left: 0,
                        right: 0,
                        textAlign: "center",
                        width: resolution.width,
                        height: resolution.height,
                    }}
                />
            </header>
            <Handler />
        </>
    );
};

export default WebcamWithPosenet;
