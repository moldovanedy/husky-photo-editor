import { db } from "./db";
import { v1 as uuid } from "uuid";
import { IndexableType } from "dexie";
import { store } from "../redux/global.store";
import { createMessage, MessageType } from "../redux/messages.redux";
import { deleteProjectRedux } from "../redux/projectManagement.redux";
import { displayProject } from "../projectInteractions/displayProject";

/**
 * Creates a new project and stores it in memory.
 * @param projectName The name of the project
 * @param initialData An Uint8ClampedArray containing pixel data
 * @param width The width of the project
 * @param height The height of the project
 * @returns A promise with IndexableType whose value is the project's id or null if there was an error
 */
export async function createNewProjectDB(
    projectName: string,
    initialData: Uint8ClampedArray,
    width: number,
    height: number
): Promise<IndexableType | null> {
    try {
        let id = await db.projects.add({
            id: uuid(),
            name: projectName,
            width: width,
            height: height,
            currentData: [
                {
                    data: initialData,
                    name: "Layer1",
                    width: width,
                    height: height,
                    zIndex: 1
                }
            ],
            modificationsStack: []
        });

        db.misc.get("openedProjects").then((projects) => {
            if (projects === undefined) {
                db.misc.add({
                    key: "openedProjects",
                    value: [id]
                });
            } else {
                projects.value.push(id);
                db.misc.update("openedProjects", {
                    key: projects.key,
                    value: projects.value
                });
            }
        });

        return id;
    } catch {
        store.dispatch(
            createMessage({
                message: "An unknown indexedDB error has occured.",
                type: MessageType.Error
            })
        );
        return null;
    }
}

export async function deleteProjectDB(projectId: string): Promise<boolean> {
    function resolve() {
        store.dispatch(deleteProjectRedux(projectId));
        return true;
    }

    function reject() {
        return false;
    }

    try {
        let success = await db.projects.delete(projectId).then(resolve, reject);

        db.misc.get("openedProjects").then((projects) => {
            if (projects !== undefined) {
                let index = -1;
                for (let i = 0; i < projects.value.length; i++) {
                    if (projects.value[i] === projectId) {
                        index = i;
                    }
                }

                if (index !== -1) {
                    projects.value.splice(index, 1);
                }

                setTimeout(() => {
                    projects.value.forEach((item) => {
                        displayProject(item);
                    });
                }, 200);

                db.misc.update("openedProjects", {
                    key: projects.key,
                    value: projects.value
                });
            }
        });

        return success;
    } catch {
        store.dispatch(
            createMessage({
                message: "An unknown indexedDB error has occured.",
                type: MessageType.Error
            })
        );
        return false;
    }
}
