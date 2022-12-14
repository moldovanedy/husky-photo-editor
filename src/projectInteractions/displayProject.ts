import { State } from "../GlobalSpecialState";
import { store } from "../redux/global.store";
import { createMessage, MessageType } from "../redux/messages.redux";
import {
    completeProjectLoading,
    setActiveProjectRedux
} from "../redux/projectManagement.redux";
import { setProjectAsActive } from "../redux/userInterface.redux";
import { db } from "../storage/db";

/**
 * Gets the project data and creates the HTML elements that represent the project (canvases for eact layer and a div element as the parent whose id will be the project's uuid)
 * @param id The uuid of the project from the db
 */
export function displayProject(id: string) {
    let i18n = State.getObject("translationContext");
    db.projects.get(id).then((proj) => {
        if (proj !== null && proj !== undefined) {
            let container = document.getElementById(id);
            for (let i = 0; i < proj.currentData.length; i++) {
                let canvas = document.createElement("canvas");
                canvas.setAttribute("id", `${proj.id}_${i + 1}`);
                canvas.setAttribute("class", "project");
                canvas.style.zIndex = `${i + 1}`;
                canvas.style.border = "3px dashed #000";
                container?.appendChild(canvas);
                State.addObject(`${proj.id}_${i + 1}`, canvas);
            }
            let children = container?.childNodes;
            if (children === undefined) return;

            children.forEach((canvas, i) => {
                if (canvas !== null && canvas instanceof HTMLCanvasElement) {
                    // don't modify helpers here
                    if (canvas.getAttribute("id") !== "helpers") {
                        canvas.width = proj.width;
                        canvas.height = proj.height;

                        let ctx = canvas.getContext("2d");
                        if (
                            ctx !== null &&
                            proj.currentData[i] !== null &&
                            proj.currentData[i] !== undefined
                        ) {
                            let imageData = new ImageData(
                                proj.currentData[i].data,
                                proj.currentData[i].width,
                                proj.currentData[i].height
                            );
                            ctx.fillRect(
                                0,
                                0,
                                imageData.width,
                                imageData.height
                            );
                            ctx.putImageData(imageData, 0, 0);
                            store.dispatch(completeProjectLoading(id));
                            store.dispatch(
                                setProjectAsActive(proj.id.toString())
                            );
                            store.dispatch(
                                setActiveProjectRedux(proj.id.toString())
                            );
                        }
                    }
                } else {
                    store.dispatch(
                        createMessage({
                            message: i18n("messages:errors.unknownError"),
                            type: MessageType.Error
                        })
                    );
                }
            });
        } else {
            store.dispatch(
                createMessage({
                    message: i18n("messages:errors.unknownError"),
                    type: MessageType.Error
                })
            );
        }
    });
}
