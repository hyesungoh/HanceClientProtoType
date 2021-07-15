import { useState, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";

interface IComparePose {
    frameId: number;
    keypoints: number[];
    box: number[];
}

const useCoaching = () => {
    let frameId: number = 0;
    const poseStack: IComparePose[] = [];

    // const [comparePoseStack, setComparePoseStack] = useState<IComparePose[]>(
    //     []
    // );

    const compareAlgorithm = () => {
        // 1. pose의 키포인트 값을 쌓아서 1초마다 비동기적으로 수행
        // axios 액션이 아닌 여기서 비동기식으로 비교 알고리즘을 수행할 수 있게
    };

    const getFormattedPoseData = (pose: posenet.Pose) => {
        const formattedPoseData: IComparePose = {
            frameId: frameId++,
            keypoints: [],
            box: [],
        };

        pose.keypoints.forEach((keypoint) => {
            formattedPoseData.keypoints.push(keypoint.position.x);
            formattedPoseData.keypoints.push(keypoint.position.y);
        });

        const pureBoundingBox = posenet.getBoundingBox(pose.keypoints);

        formattedPoseData.box.push(pureBoundingBox.minX);
        formattedPoseData.box.push(pureBoundingBox.minY);
        formattedPoseData.box.push(pureBoundingBox.maxX);
        formattedPoseData.box.push(pureBoundingBox.maxY);

        return formattedPoseData;
    };

    const stackingPose = (pose: posenet.Pose) => {
        const formattedPoseData: IComparePose = getFormattedPoseData(pose);
    };

    return { stackingPose };
};

export default useCoaching;
