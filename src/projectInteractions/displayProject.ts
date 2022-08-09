import { State } from "../GlobalSpecialState";
import { store } from "../redux/global.store";
import { createMessage, MessageType } from "../redux/messages.redux";
import {
    completeProjectLoading,
    setActiveProjectRedux
} from "../redux/projectManagement.redux";
import { db } from "../storage/db";

export function displayProject(id: string) {
    db.projects.get(id).then((proj) => {
        if (proj !== null && proj !== undefined) {
            let container = document.getElementById(id);
            for (let i = 0; i < proj.currentData.length; i++) {
                let canvas = document.createElement("canvas");
                canvas.setAttribute("id", `${proj.id}_${i + 1}`);
                canvas.setAttribute("class", "project");
                container?.appendChild(canvas);
                State.addObject(id, canvas);
            }
            let children = container?.childNodes;
            if (children === undefined) return;

            children.forEach((canvas, i) => {
                if (canvas !== null && canvas instanceof HTMLCanvasElement) {
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
                        ctx.fillRect(0, 0, imageData.width, imageData.height);
                        ctx.putImageData(imageData, 0, 0);
                        store.dispatch(completeProjectLoading(id));
                        store.dispatch(setActiveProjectRedux(proj.id));
                    }
                } else {
                    store.dispatch(
                        createMessage({
                            message: "An unknown error occured.",
                            type: MessageType.Error
                        })
                    );
                }
            });
        } else {
            store.dispatch(
                createMessage({
                    message: "An unknown error occured.",
                    type: MessageType.Error
                })
            );
        }
    });
}
