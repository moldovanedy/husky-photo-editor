/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";

import styles from "./Tools.module.scss";
import { State } from "../../src/GlobalSpecialState";

import HistoryIcon from "@mui/icons-material/History";
import EditIcon from "@mui/icons-material/Edit";
import TitleIcon from "@mui/icons-material/Title";
import { RootState, store } from "../../src/redux/global.store";
import { useSelector } from "react-redux";
import { moveLayer } from "../../src/transform/move";
import {
    activateToolOptions,
    deactivateToolOptions
} from "../../src/redux/toolOptions.redux";
import { SvgIcon } from "@mui/material";

function Tools(props: { i18n: any }) {
    let toolbar = useRef<HTMLElement>(null);

    useEffect(() => {
        State.addObject("toolbar", toolbar.current);
    }, []);

    let zoomFactor = useSelector(
        (state: RootState) => state.userInterface.zoomFactor
    );
    let isToolOptionsMenuActive = useSelector(
        (state: RootState) => state.toolOptions.isActive
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
                </div> */}

                <div
                    onClick={() => {
                        store.dispatch(
                            isToolOptionsMenuActive
                                ? deactivateToolOptions()
                                : activateToolOptions()
                        );
                    }}
                >
                    {/* <EditIcon
                        className="themeDependentIcon"
                        sx={{ fontSize: "22px" }}
                    /> */}
                    <SvgIcon>
                        <svg
                            width="32"
                            height="32"
                            version="1.1"
                            viewBox="3 4 16.933 16.933"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <g fill="#fff">
                                <g stroke="#000">
                                    <g strokeWidth=".26458px">
                                        <path d="m9.004 9.7137v-2.8831h-1.6411l2.2843-2.2843 2.2843 2.2843h-1.5968v2.8831z" />
                                        <path d="m10.357 11.083v2.8831h1.6411l-2.2843 2.2843-2.2843-2.2843h1.5968v-2.8831z" />
                                        <path d="m9.0151 11.05h-2.8831v1.6411l-2.2843-2.2843 2.2843-2.2843v1.5968h2.8831z" />
                                        <path d="m10.346 9.7411h2.8831v-1.6411l2.2843 2.2843-2.2843 2.2843v-1.5968h-2.8831z" />
                                    </g>
                                </g>
                                <path d="m8.8759 9.8519 0.2569-0.00103 0.00228-0.27607 1.0653-0.00887v0.30023l0.29372 0.00413-0.0153 1.0717h-0.25814v0.29425l-1.0624-0.02046 0.00207-0.29596-0.28145-0.0021z" />
                            </g>
                        </svg>
                    </SvgIcon>
                    <span>{i18n("edit:toolOptions.moveTool.title")}</span>
                </div>

                {/* <div>
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
