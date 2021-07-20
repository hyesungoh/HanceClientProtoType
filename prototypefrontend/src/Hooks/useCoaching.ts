import { useState, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";

import l2noramlization from "Utils/Algorithm/preprocessing";
import compareFrames from "Utils/Algorithm/comparison";
import serverData from "Static/Data/serverData";

interface IComparePose {
    frameId: number;
    keypoints: number[];
    box: number[];
}

const useCoaching = () => {
    const [isStartCompare, setIsStartCompare] = useState<boolean>(false);
    let frameId: number = 0;
    let poseStack: IComparePose[] = [];
    let allPoseData: IComparePose[] = [];
    // const [poseStack, setPoseStack] = useState<IComparePose[]>([]);

    const compareAlgorithm = async () => {
        // await 유사도 비교 알고리즘 수행
        // console.log(poseStack);
        // console.log(allPoseData);

        const preprocedPose = l2noramlization(poseStack);
        const compareResult = compareFrames(preprocedPose, serverData, 95, 75);

        console.log(compareResult.meanScore);

        poseStack = [];
    };

    useEffect(() => {
        if (!isStartCompare) return;
        console.log("start compare !!");

        const interval = setInterval(async () => {
            await compareAlgorithm();
        }, 1000);

        return () => {
            clearInterval(interval);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isStartCompare]);

    const getFormattedPoseData = (pose: posenet.Pose) => {
        // frameId 증가
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
        if (!isStartCompare) return;

        const formattedPoseData: IComparePose = getFormattedPoseData(pose);
        poseStack.push(formattedPoseData);
        allPoseData.push(formattedPoseData);
        // setPoseStack((prev) => [...prev, formattedPoseData]);
    };

    // const stackingPose = useCallback(
    //     (pose: posenet.Pose) => {
    //         if (!isStartCompare) return;

    //         const formattedPoseData: IComparePose = getFormattedPoseData(pose);
    //         poseStack.push(formattedPoseData);
    //         allPoseData.push(formattedPoseData);
    //     },
    //     [isStartCompare]
    // );

    return { stackingPose, isStartCompare, setIsStartCompare };
};

export default useCoaching;
