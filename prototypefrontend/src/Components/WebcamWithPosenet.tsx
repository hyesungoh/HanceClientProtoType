import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import * as posenet from "@tensorflow-models/posenet";

import useCoaching from "Hooks/useCoaching";
import { drawKeypoints, drawSkeleton } from "Utils/draw";

interface IDrawResult {
    pose: posenet.Pose;
    videoWidth: number;
    videoHeight: number;
    canvasRef: React.RefObject<HTMLCanvasElement | null>;
}

const WebcamWithPosenet = () => {
    const [detectTime, setDetectTime] = useState<number>(1000);
    const [posenetArchitecture, setPosenetArchitecture] = useState<
        "ResNet50" | "MobileNetV1"
    >("MobileNetV1");
    const [outputStride, setOutputStride] = useState<32 | 16 | 8>(16);

    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef(null);

    const DETECT_INTERVAL_MS: number = 100;

    const { getFeedback } = useCoaching();

    useEffect(() => {
        runPosenet();
    }, []);

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
            minConfidence: 0.4,
            ctx,
        });
        drawSkeleton({ keypoints: pose["keypoints"], minConfidence: 0.4, ctx });
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
        const posenetModel = await posenet.load({
            inputResolution: { width: 640, height: 480 },
            architecture: "MobileNetV1",
            outputStride: 16,
        });

        setInterval(() => {
            detectWebcamFeed(posenetModel);
        }, DETECT_INTERVAL_MS);
    };

    return (
        <header className="App-header">
            <Webcam
                ref={webcamRef}
                style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    width: 640,
                    height: 480,
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
                    width: 640,
                    height: 480,
                }}
            />
        </header>
    );
};

export default WebcamWithPosenet;
