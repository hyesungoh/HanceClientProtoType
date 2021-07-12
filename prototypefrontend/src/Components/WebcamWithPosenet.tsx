import { useRef } from "react";

import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { useEffect } from "react";
import useCoaching from "Hooks/useCoaching";

interface drawProps {
    pose: posenet.Pose;
    video: HTMLVideoElement;
    videoWidth: number;
    videoHeight: number;
}

const WebcamWithPosenet = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef(null);

    const DETECT_INTERVAL_MS: number = 2000;

    const { getFeedback } = useCoaching();

    useEffect(() => {
        runPosenet();
    }, []);

    // const drawResult = ({
    //     pose,
    //     video,
    //     videoWidth,
    //     videoHeight,
    // }: drawProps) => {
    //     if (!canvasRef.current) return;

    //     const ctx = canvasRef.current.get;
    //     canvas.current.width = videoWidth;
    //     canvas.current.height = videoHeight;
    //     drawKeypoints(pose["keypoints"], 0.6, ctx);
    //     drawSkeleton(pose["keypoints"], 0.7, ctx);
    // };

    const detectWebcamFeed = async (posenetModel: posenet.PoseNet) => {
        if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video?.videoWidth;
            const videoHeight = webcamRef.current.video?.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            const pose = await posenetModel.estimateSinglePose(video);
            const score = await getFeedback({ pose });
            console.log(score);
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
