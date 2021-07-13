import * as posenet from "@tensorflow-models/posenet";

const color = "aqua";
const lineWidth = 2;

export const tryResNetButtonName = "tryResNetButton";
export const tryResNetButtonText = "[New] Try ResNet50";

function toTuple({ y, x }) {
    return [y, x];
}

//  /**
//   * Draws a line on a canvas, i.e. a joint
//   */
export function drawSegment([ay, ax], [by, bx], color, scale, ctx) {
    ctx.beginPath();
    ctx.moveTo(ax * scale, ay * scale);
    ctx.lineTo(bx * scale, by * scale);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = color;
    ctx.stroke();
}

//  /**
//   * Draws a pose skeleton by looking up all adjacent keypoints/joints
//   */
export function drawSkeleton(keypoints, minConfidence, ctx, scale = 1) {
    const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
        keypoints,
        minConfidence
    );

    adjacentKeyPoints.forEach((keypoints) => {
        drawSegment(
            toTuple(keypoints[0].position),
            toTuple(keypoints[1].position),
            color,
            scale,
            ctx
        );
    });
}

//  /**
//   * Draw pose keypoints onto a canvas
//   */
export function drawKeypoints(keypoints, minConfidence, ctx, scale = 1) {
    for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i];

        if (keypoint.score < minConfidence) {
            continue;
        }

        const { y, x } = keypoint.position;
        drawPoint(ctx, y * scale, x * scale, 3, color);
    }
}

//  /**
//   * Used by the drawHeatMapValues method to draw heatmap points on to
//   * the canvas
//   */
function drawPoints(ctx, points, radius, color) {
    const data = points.buffer().values;

    for (let i = 0; i < data.length; i += 2) {
        const pointY = data[i];
        const pointX = data[i + 1];

        if (pointX !== 0 && pointY !== 0) {
            ctx.beginPath();
            ctx.arc(pointX, pointY, radius, 0, 2 * Math.PI);
            ctx.fillStyle = color;
            ctx.fill();
        }
    }
}
