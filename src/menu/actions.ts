import { createNewProjectDB } from "../storage/projectManagement";
import { fileToImageData } from "../conversions";
import { db } from "../storage/db";
import { displayProject } from "../projectInteractions/displayProject";
import { store } from "../redux/global.store";
import { addProjectToState } from "../redux/projectManagement.redux";
import { switchActiveProject } from "../projectInteractions/switchActiveProject";
import { startWork, completeWork } from "../redux/userInterface.redux";

export function openFiles(files: FileList) {
    for (let i = 0; i < files.length; i++) {
        store.dispatch(startWork());

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
