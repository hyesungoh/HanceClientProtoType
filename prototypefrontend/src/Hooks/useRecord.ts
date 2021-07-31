import { useEffect, useRef, RefObject } from "react";
import Webcam from "react-webcam";
import { useRecoilValue } from "recoil";
import { isStartCompareState } from "Store";

interface IUseRecord {
    webcamRef: RefObject<Webcam>;
}

const useRecord = ({ webcamRef }: IUseRecord) => {
    const isStartCompare = useRecoilValue(isStartCompareState);

    const mediaRecordRef = useRef<any>(null);

    const startRecord = () => {
        if (!isStartCompare) return;
        if (!webcamRef.current) return;
        if (webcamRef.current.stream === null) return;

        mediaRecordRef.current = new MediaRecorder(webcamRef.current.stream, {
            mimeType: "video/webm",
        });
    };

    useEffect(() => {}, []);

    return { recordWebcamRef: webcamRef };
};

export default useRecord;
