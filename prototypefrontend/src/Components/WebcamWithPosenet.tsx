// async function estimatePoseOnImage(imageElement) {
//     // load the posenet model from a checkpoint
//     const net = await posenet.load();

//     const pose = await net.estimateSinglePose(imageElement, {
//       flipHorizontal: false
//     });
//     return pose;
//   }

//   const imageElement = document.getElementById('cat');

//   const pose = estimatePoseOnImage(imageElement);

//   console.log(pose);

const WebcamWithPosenet = () => {
    return <div>this is webcam</div>;
};

export default WebcamWithPosenet;
