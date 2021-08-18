import { useState, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";

import l2noramlization from "Utils/Algorithm/preprocessing";
import compareFrames from "Utils/Algorithm/comparison";
import serverData from "Static/Data/serverData";
import { data as weride2Data } from "Static/Data/weride2Data";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    compareCurrentMeanScoreState,
    compareIsPassedState,
    isStartCompareState,
} from "Store";
interface IComparePose {
    frameId: number;
    keypoints: number[];
    box: number[];
}

const useCoaching = () => {
    // const [isStartCompare, setIsStartCompare] = useState<boolean>(false);
    const [isStartCompare, setIsStartCompare] =
        useRecoilState(isStartCompareState);
    const setMeanScore = useSetRecoilState(compareCurrentMeanScoreState);
    const setIsPassed = useSetRecoilState(compareIsPassedState);

    let frameId: number = 0;
    let poseStack: IComparePose[] = [];
    let allPoseData: IComparePose[] = [];

    let currentSecond: number = 0;
    // const fileTitle: string = ""
    // const [poseStack, setPoseStack] = useState<IComparePose[]>([]);

    const compareAlgorithm = async () => {
        // await 유사도 비교 알고리즘 수행
        // console.log(poseStack);
        // console.log(allPoseData);

        const weride2DataSeconds = 19;
        const serverDataFps = weride2Data.length / weride2DataSeconds;
        console.log(`compare Start ! ${currentSecond - 1} ~ ${currentSecond}`);

        if (currentSecond > 0) {
            const startIdx = (currentSecond - 1) * serverDataFps;
            const endIdx = currentSecond * serverDataFps;
            const slicedServerData = weride2Data.slice(startIdx, endIdx);

            const preprocedPose = l2noramlization(poseStack);
            const compareResult = compareFrames(
                preprocedPose,
                slicedServerData,
                95,
                75
            );

            setIsPassed(compareResult.isPassed);
            setMeanScore(compareResult.meanScore);
            poseStack = [];
        }
    };

    useEffect(() => {
        if (!isStartCompare) return;

        const interval = setInterval(async () => {
            currentSecond++;
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

    return { stackingPose };
};

export default useCoaching;
