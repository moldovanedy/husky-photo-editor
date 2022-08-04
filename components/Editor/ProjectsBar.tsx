/* eslint-disable @next/next/no-img-element */
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useRef } from "react";

import styles from "./ProjectsBar.module.scss";

function ProjectsBar() {
    let projectsBar = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={projectsBar}
            className={styles.main}
            onWheel={(event) => {
                if (projectsBar.current !== null) {
                    projectsBar.current.scrollBy(
                        Math.round(event.deltaY / 4),
                        0
                    );
                }
            }}
        >
            <div>
                <img
                    src="/assets/logo/logo64x64.png"
                    alt="Project1"
                    height={48}
                />
                <FontAwesomeIcon icon={faTimes} size={"2x"} />
            </div>
            <div>
                <img
                    src="/assets/logo/logo64x64.png"
                    alt="Project2"
                    height={48}
                />
                <FontAwesomeIcon icon={faTimes} size={"2x"} />
            </div>
            <div>
                <img
                    src="/assets/logo/logo64x64.png"
                    alt="Project3"
                    height={48}
                />
                <FontAwesomeIcon icon={faTimes} size={"2x"} />
            </div>
            <div>
                <img
                    src="/assets/logo/logo64x64.png"
                    alt="Project4"
                    height={48}
                />
                <FontAwesomeIcon icon={faTimes} size={"2x"} />
            </div>
            <div>
                <img
                    src="/assets/logo/logo64x64.png"
                    alt="Project5"
                    height={48}
                />
                <FontAwesomeIcon icon={faTimes} size={"2x"} />
            </div>
            <div>
                <img
                    src="/assets/logo/logo64x64.png"
                    alt="Project6"
                    height={48}
                />
                <FontAwesomeIcon icon={faTimes} size={"2x"} />
            </div>
            <div>
                <img
                    src="/assets/logo/logo64x64.png"
                    alt="Project7"
                    height={48}
                />
                <FontAwesomeIcon icon={faTimes} size={"2x"} />
            </div>
        </div>
    );
}

export default ProjectsBar;
