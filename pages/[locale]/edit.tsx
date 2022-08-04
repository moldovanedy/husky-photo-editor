/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import Head from "next/head";

import TopBar from "../../components/Editor/TopBar";
import Tools from "../../components/Editor/Tools";
import ProjectsBar from "../../components/Editor/ProjectsBar";

import styles from "./../../styles/edit.module.scss";
import { State } from "../../src/GlobalSpecialState";
import { store } from "./../../src/redux/global.store";

function Edit() {
    let mainElement = useRef<HTMLElement>(null);

    useEffect(() => {
        window.addEventListener("resize", () => {
            if (mainElement.current !== null) {
                mainElement.current.style.height = `${
                    store.getState().environmentInfo.windowHeight -
                    mainElement.current.offsetTop -
                    (store.getState().environmentInfo.windowHeight -
                        State.getObject("toolbar").offsetTop)
                }px`;
            }
        });
    }, [State.getObject("toolbar")]);

    useEffect(() => {
        if (mainElement.current !== null) {
            mainElement.current.style.height = `${
                store.getState().environmentInfo.windowHeight -
                mainElement.current.offsetTop -
                (store.getState().environmentInfo.windowHeight -
                    State.getObject("toolbar").offsetTop)
            }px`;
        }
    }, []);

    return (
        <>
            <Head>
                <title>Edit photo</title>
            </Head>

            <TopBar />
            <ProjectsBar />

            <main
                ref={mainElement}
                className={styles.mainScrollElement}
                style={{
                    height:
                        mainElement.current !== null
                            ? `${
                                  store.getState().environmentInfo
                                      .windowHeight -
                                  mainElement.current.offsetTop -
                                  (store.getState().environmentInfo
                                      .windowHeight -
                                      State.getObject("toolbar").offsetTop)
                              }px`
                            : "300px"
                }}
            >
                {/* TODO: make margins grow individually when user tries to scroll beyond 0 or canvas width or height by setting margin-top when user goes up, margin-botom: canvas height + value when user goes down etc. */}
                <div className={styles.canvasContainer}>
                    <canvas
                        style={{
                            backgroundImage:
                                "linear-gradient(135deg, red, green, blue)"
                        }}
                        width={2000}
                        height={2000}
                    ></canvas>

                    <canvas
                        style={{
                            backgroundImage:
                                "linear-gradient(45deg, red, green, blue)"
                        }}
                        width={2000}
                        height={2000}
                    ></canvas>

                    <canvas
                        style={{
                            backgroundImage:
                                "linear-gradient(90deg, red, green, blue)"
                        }}
                        width={2000}
                        height={2000}
                    ></canvas>
                </div>
            </main>

            <Tools />
        </>
    );
}

export default Edit;
