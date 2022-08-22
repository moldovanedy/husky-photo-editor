import { Point, Vector2 } from "./units";

export interface Transform {
    translate?: Vector2;
    rotate?: number;
    scale?: Vector2;
}

export interface Picture extends Transform {
    data: string; //base64 string of the original image
    width: number;
    height: number;
    topLeftPoint: Point;
}
