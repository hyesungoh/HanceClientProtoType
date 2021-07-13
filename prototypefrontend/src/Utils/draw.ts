import * as posenet from "@tensorflow-models/posenet";
import { Tuple } from "@tensorflow-models/posenet/dist/keypoints";

const color = "aqua";
const lineWidth = 2;

export const tryResNetButtonName = "tryResNetButton";
export const tryResNetButtonText = "[New] Try ResNet50";

interface IToTuple {
    y: number;
    x: number;
}

function toTuple({ y, x }: IToTuple) {
    return [y, x];
}

//  /**
//   * Draws a line on a canvas, i.e. a joint
//   */

interface IDrawSegment {
    // aPos: [number, number];
    // bPos: [number, number];
    aPos: number[];
    bPos: number[];
    color: string;
    scale: number;
    ctx: CanvasRenderingContext2D;
}

export function drawSegment({
    aPos: [ay, ax],
    bPos: [by, bx],
    color,
    scale,
    ctx,
}: IDrawSegment) {
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

interface IDrawSkeleton {
    keypoints: posenet.Keypoint[];
    minConfidence: number;
    ctx: CanvasRenderingContext2D;
    scale?: number;
}

export function drawSkeleton({
    keypoints,
    minConfidence,
    ctx,
    scale = 1,
}: IDrawSkeleton) {
    const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
        keypoints,
        minConfidence
    );

    adjacentKeyPoints.forEach((keypoints) => {
        drawSegment({
            aPos: toTuple(keypoints[0].position),
            bPos: toTuple(keypoints[1].position),
            color,
            scale,
            ctx,
        });
    });
}

interface IDrawPoint {
    ctx: CanvasRenderingContext2D;
    y: number;
    x: number;
    r: number;
    color: string;
}

export function drawPoint({ ctx, y, x, r, color }: IDrawPoint) {
    ctx.beginPath();
    ctx.arc(x, y, r, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

//  /**
//   * Draw pose keypoints onto a canvas
//   */
interface IDrawKeyPoints {
    keypoints: posenet.Keypoint[];
    minConfidence: number;
    ctx: CanvasRenderingContext2D;
    scale?: number;
}
export function drawKeypoints({
    keypoints,
    minConfidence,
    ctx,
    scale = 1,
}: IDrawKeyPoints) {
    for (let i = 0; i < keypoints.length; i++) {
        const keypoint = keypoints[i];

        if (keypoint.score < minConfidence) {
            continue;
        }

        const { y, x } = keypoint.position;
        drawPoint({ ctx, y: y * scale, x: x * scale, r: 3, color });
    }
}
