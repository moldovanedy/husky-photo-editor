import { Point } from "./units";

export interface Picture {
    data: Uint8ClampedArray;
    width: number;
    height: number;
    topLeftPoint: Point;
}
