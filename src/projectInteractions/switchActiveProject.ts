import { store } from "../redux/global.store";
import { setProjectAsActive } from "../redux/userInterface.redux";

/**
 * Hides all other opened projects with display: none and shows only the active project
 * @param id The uuid of the project from the db
 */
export function switchActiveProject(id: string) {
    let openedProjects = store.getState().projectManagement;
    store.dispatch(setProjectAsActive(id));

    openedProjects.forEach((project) => {
        let element = document.getElementById(project.id);
        if (element !== null && element !== undefined) {
            if (project.id === id) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        }
    });
}
