import { store } from "../redux/global.store";

export function switchActiveProject(id: string) {
    let openedProjects = store.getState().projectManagement;
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
