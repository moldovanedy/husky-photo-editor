import { createNewProjectDB } from "../storage/projectManagement";
import { fileToImageData } from "../conversions";
import { db } from "../storage/db";
import { displayProject } from "../projectInteractions/displayProject";
import { store } from "../redux/global.store";
import { addProjectToState } from "../redux/projectManagement.redux";
import { switchActiveProject } from "../projectInteractions/switchActiveProject";
import { startWork, completeWork } from "../redux/userInterface.redux";
import { createMessage, MessageType } from "../redux/messages.redux";
import { State } from "../GlobalSpecialState";

/**
 * Transforms an array of files into projects and stores the projects in IndexedDB
 * @param files The array of files obtained from <input type="file" />
 */
export function openFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
        store.dispatch(startWork());
        let i18n = State.getObject("translationContext");

        if (!files[i].type.startsWith("image/")) {
            store.dispatch(
                createMessage({
                    message: i18n("messages:warnings.invalidFileType"),
                    type: MessageType.Error
                })
            );
            store.dispatch(completeWork());
            continue;
        }

        //@ts-ignore Object is possibly "null"
        fileToImageData(files[i]).then((imgData) => {
            createNewProjectDB(
                //@ts-ignore Object is possibly "null"
                files[i].name,
                imgData.data,
                imgData.width,
                imgData.height
            ).then((id) => {
                store.dispatch(
                    addProjectToState({
                        //@ts-ignore
                        id: id.toString(),
                        name: files[i].name,
                        width: imgData.width,
                        height: imgData.height,
                        isLoading: true,
                        isActive: false
                    })
                );

                if (id !== null) {
                    displayProject(id.toString());
                    switchActiveProject(id.toString());
                    store.dispatch(completeWork());
                    return true;
                } else {
                    store.dispatch(completeWork());
                    return false;
                }
            });
        });
    }
}
