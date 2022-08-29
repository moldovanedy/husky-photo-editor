import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from "@mui/material";
import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState, store } from "../../src/redux/global.store";
import { closeHelpMenu } from "../../src/redux/userInterface.redux";

import styles from "./FrameHelp.module.scss";

import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

function FrameHelp(props: { i18n: any }) {
    let open = useSelector(
            (state: RootState) => state.userInterface.helpMenuActive
        ),
        frameSrc = useSelector(
            (state: RootState) => state.userInterface.helpMenuUrl
        );
    let i18n = props.i18n;

    let frame = useRef<HTMLIFrameElement>(null);

    return (
        <Dialog
            fullScreen
            fullWidth={true}
            maxWidth={false}
            open={open}
            onClose={() => {
                store.dispatch(closeHelpMenu());
            }}
            aria-labelledby="alert-dialog-title"
            TransitionComponent={Transition}
            sx={{
                zIndex: 8500,
                "& .css-g0ojgh-MuiPaper-root-MuiDialog-paper": {
                    height: "100%"
                }
            }}
        >
            <DialogTitle id="alert-dialog-title">
                {i18n("common:help")}
            </DialogTitle>
            <DialogContent sx={{ overflow: "hidden" }}>
                <iframe
                    key={1}
                    ref={frame}
                    src={frameSrc}
                    style={{ width: "100%", height: "95%" }}
                    //preventing navigation doesn't work...

                    // onLoad={() => {
                    //     let linkArray = [];
                    //     linkArray =
                    //         frame.current.contentWindow?.document.body.getElementsByTagName(
                    //             "a"
                    //         );

                    //     for (let i = 0; i < linkArray?.length; i++) {
                    //         linkArray
                    //             ?.item(i)
                    //             ?.setAttribute("target", "_blank");
                    //     }
                    // }}
                ></iframe>
                <a
                    href={`http://localhost:8080${frameSrc}`}
                    target="_blank"
                    rel="noreferrer"
                >
                    Open in separate tab
                </a>
            </DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => {
                        store.dispatch(closeHelpMenu());
                    }}
                >
                    {i18n("common:ok")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FrameHelp;
