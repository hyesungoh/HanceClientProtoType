import { useState, useEffect } from "react";
import * as posenet from "@tensorflow-models/posenet";

interface IComparePose {
    frameId: number;
    keypoints: number[];
    box: number[];
}

const useCoaching = () => {
    const [comparePoseStack, setComparePoseStack] = useState<IComparePose[]>(
        []
    );

    const compareAlgorithm = () => {};

    // 1. pose의 키포인트 값을 쌓아서 1초마다 비동기적으로 수행
    // axios 액션이 아닌 여기서 비동기식으로 비교 알고리즘을 수행할 수 있게

    const stackingPose = (pose: posenet.Pose) => {
        // setComparePoseStack((prev) => {});
    };

    return { stackingPose };
};

export default useCoaching;
