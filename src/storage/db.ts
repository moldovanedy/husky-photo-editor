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
    originalPhotoName?: string;
    lastModifiedInApp?: number;
    initialData: Uint8ClampedArray; //array of bytes from original photo
    currentData: Layer[];
    modificationsStack: ModificationItem[];
}

export class RecentProjects extends Dexie {
    projects!: Table<Project>;

    constructor() {
        super("RecentProjects");
        this.version(1).stores({
            projects: "id" // Primary key and indexed props
        });
    }
}

export const db = new RecentProjects();
