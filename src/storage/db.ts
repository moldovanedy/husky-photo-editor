import Dexie, { Table } from "dexie";
import { Point } from "../objects/units";

/**
 * Representation of a layer in a project
 */
export interface Layer {
    data: Uint8ClampedArray;
    name: string;
    width: number;
    height: number;
    zIndex: number;
    topLeftPoint?: Point;
}

/**
 * If it is a Modification, store only some data to describe what happened (move: {X: 15, Y: 15}). If it is a Snapshot, store every layer as an ImageData object
 */
export enum Storage {
    Modification,
    Snapshot
}

/**
 * Representation of a modification made to the project (rotate, move, add text etc.)
 */
export interface ModificationItem {
    type: Storage;
    operationNumber: number; // the order number (1 is first modification, 2 is the second etc.)
    isExpensive: boolean; // is the operation computationally expensive?
    name: string;
    data: any;
}

/**
 * Representation of the project stored in the db
 */
export interface Project {
    id: string;
    name: string;
    originalPhotoName?: string;
    lastModifiedInApp?: number;
    currentData: Layer[];
    modificationsStack: ModificationItem[];
    width: number;
    height: number;
    thumbnailPNG?: string;
}

/**
 * Representation of the miscellaneous data stored in the "misc" table
 */
interface MiscellaneousData {
    key: string;
    value: any;
}

/**
 * The Dexie class for IndexedDB storage
 */
export class HuskyPhotoEditor extends Dexie {
    projects!: Table<Project>;
    misc!: Table<MiscellaneousData>;

    constructor() {
        super("HuskyPhotoEditor");
        this.version(1).stores({
            // Primary keys
            projects: "id",
            misc: "key"
        });
    }
}

export const db = new HuskyPhotoEditor();
