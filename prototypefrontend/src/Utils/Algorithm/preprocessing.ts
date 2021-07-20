import Frame from "./frame";

const l2normalization = (frames: Frame[]): Frame[] => {
    const normalizedFrames: Frame[] = [];
    frames.forEach((frame, index) => {
        const normalizedFrame: Frame = {
            'frameId': 0,
            'keypoints': [],
            'box': []
        }

        const keypoints = frame.keypoints;
        const box = frame.box;
        const tempX = Math.abs(box[0] - box[2]) / 2;
        const tempY = Math.abs(box[1] - box[3]) / 2;
        let subX = 0, subY = 0;

        if (tempX <= tempY) {
            if (box[0] <= box[2]) {
                subX = box[0] - (tempY - tempX);
            } else {
                subX = box[2] - (tempY - tempX);
            }
            if (box[1] <= box[3]) {
                subY = box[1];
            } else {
                subY = box[3];
            }
        } else {
            if (box[1] <= box[3]){
                subY = box[1] - (tempX - tempY)
            } else {
                subY = box[3] - (tempX - tempY)
            }
            if (box[0] <= box[2]) {
                subX = box[0]
            } else {
                subX = box[2]
            }
        }
        const temp: number[] = [];
        for(let i = 0; i < 17; i++) {
            temp.push(keypoints[i * 2] - subX)
            temp.push(keypoints[i * 2 + 1] - subY)
        }
        const norm = calculateNorm(temp);
        const normalizedKeypoints: number[] = []
        for (let i = 0; i < 17; i++) {
            const normalizedXpos = (keypoints[i * 2] - subX) / norm;
            const normalizedYpos = (keypoints[i * 2 + 1] - subY) / norm;
            normalizedKeypoints.push(normalizedXpos);
            normalizedKeypoints.push(normalizedYpos);
        }
        normalizedFrame.frameId = index;
        normalizedFrame.keypoints = normalizedKeypoints;
        normalizedFrame.box = frame.box;
        normalizedFrames.push(normalizedFrame);
    });
    return normalizedFrames;
}

const calculateNorm = (numbers: number[]) => {
    const powerSum = numbers.reduce((acc: number, cur: number): number => {
        return acc + Math.pow(cur, 2)
    }, 0)
    return Math.sqrt(powerSum)
}

export default l2normalization;