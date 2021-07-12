import * as posenet from "@tensorflow-models/posenet";

interface IGetFeedBack {
    pose: posenet.Pose;
}

interface IResGetFeedBack {
    score: number;
    advice: string;
}

const useCoaching = () => {
    const getFeedback = async ({ pose }: IGetFeedBack) => {
        // some axios action
        return { score: 100 };
    };

    return { getFeedback };
};

export default useCoaching;
