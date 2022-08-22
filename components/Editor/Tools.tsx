/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";

import styles from "./Tools.module.scss";
import { State } from "../../src/GlobalSpecialState";

import HistoryIcon from "@mui/icons-material/History";
import EditIcon from "@mui/icons-material/Edit";
import TitleIcon from "@mui/icons-material/Title";
import { RootState } from "../../src/redux/global.store";
import { useSelector } from "react-redux";

function Tools(props: { i18n: any }) {
    let toolbar = useRef<HTMLElement>(null);

    useEffect(() => {
        State.addObject("toolbar", toolbar.current);
    }, []);

    let zoomFactor = useSelector(
        (state: RootState) => state.userInterface.zoomFactor
    );

    let i18n = props.i18n;

    return (
        <>
            <aside
                className={styles.main}
                ref={toolbar}
                onWheel={(event) => {
                    if (toolbar.current !== null) {
                        toolbar.current.scrollBy(
                            Math.round(event.deltaY / 4),
                            0
                        );
                    }
                }}
            >
                {/* for future */}
                {/* <div>
                    <HistoryIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "22px" }}
                    />
                    <span>Recent</span>
                </div>
                <div>
                    <EditIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "22px" }}
                    />
                    <span>Transform</span>
                </div>
                <div>
                    <EditIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "22px" }}
                    />
                    <span>Paint</span>
                </div>
                <div>
                    <TitleIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "22px" }}
                    />
                    <span>Text</span>
                </div> */}
            </aside>

            <aside className={styles.infoPanel}>
                <span></span>
                <span>
                    {i18n("common:scale")}: {zoomFactor.toFixed(2)}
                </span>
                <span>{i18n("common:layer")}: 1</span>
            </aside>
        </>
    );
}

export default Tools;
