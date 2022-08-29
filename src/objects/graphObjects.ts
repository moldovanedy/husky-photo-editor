import { Point, Vector2 } from "./units";

/**
 * The 2d transform property of an object in the graph
 */
export interface Transform {
    translate?: Vector2;
    rotate?: number;
    scale?: Vector2;
}

/**
 * The representation of a photo in the graph
 */
export interface Photo extends Transform {
    data: string; //base64 string of the original image
    width: number;
    height: number;
    topLeftPoint: Point;
}
