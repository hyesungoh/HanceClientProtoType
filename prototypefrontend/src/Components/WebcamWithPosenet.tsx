import { useRef } from "react";

import * as tf from "@tensorflow/tfjs";
import * as posenet from "@tensorflow-models/posenet";
import Webcam from "react-webcam";

const WebcamWithPosenet = () => {
    const webcamRef = useRef<Webcam>(null);
    const canvasRef = useRef(null);

    // const detectWebcamFeed = async() = {
    //     if(!webcamRef.current) {
    //         const video = webcamRef.current.video;
    //         const videoWidth = webcamRef.current.video.videoWidth;
    //         const videoHeight = webcamRef.current.video.videoHeight;

    //         webcamRef.current.video.width = videoWidth;
    //         webcamRef.current.video.height = videoHeight;
    //     },
    // };

    const detectWebcamFeed = async () => {
        if (webcamRef.current && webcamRef.current.video) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video?.videoWidth;
            const videoHeight = webcamRef.current.video?.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;
        }
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
