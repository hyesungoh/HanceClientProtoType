import { useRef } from "react";

import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";
import { useEffect } from "react";

const WebcamWithPosenet = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef(null);
    
    useEffect(() => {
        runPosenet();
    }, []);

    const detectWebcamFeed = async (posenetModel: posenet.PoseNet) => {
        if (webcamRef.current && webcamRef.current.video?.readyState === 4) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video?.videoWidth;
            const videoHeight = webcamRef.current.video?.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            const pose = await posenetModel.estimateSinglePose(video);
            console.log(pose.keypoints);
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
        }, 5000);
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
