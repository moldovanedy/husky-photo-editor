import Dexie, { Table } from "dexie";

export interface Layer {
    data: Uint8ClampedArray;
    name: string;
    width: number;
    height: number;
    zIndex: number;
}

export enum Storage {
    Modification,
    Snapshot
}

export interface ModificationItem {
    type: Storage;
    operationNumber: number; // the order number (1 is first modification, 2 is the second etc.)
    expensive: boolean; // is the operation computationally expensive?
    name: string;
    data: any;
}

export interface Project {
    id: string;
    name: string;
    originalPhotoName?: string;
    lastModifiedInApp?: number;
    currentData: Layer[];
    modificationsStack: ModificationItem[];
    width: number;
    height: number;
}

interface MiscellaneousData {
    key: string;
    value: any;
}

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
