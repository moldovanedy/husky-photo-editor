import { v1 as uuid } from "uuid";
import {
    MenuItem,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    Select,
    Slider,
    Input,
    InputLabel,
    DialogTitle,
    TextField,
    DialogContentText,
    LinearProgress
} from "@mui/material";
import { useState, useRef, useEffect } from "react";
import { State } from "../../../../src/GlobalSpecialState";
import { downloadPhotoFromImageData } from "../../../../src/savePhoto";
import { db, Project } from "../../../../src/storage/db";
import { useSelector } from "react-redux";
import { RootState, store } from "../../../../src/redux/global.store";
import { startWork } from "../../../../src/redux/userInterface.redux";

export function SaveDialog(props: { closeEvent: any }) {
    let [qualityValue, setQualityValue] = useState(90),
        [fileFormat, setFileFormat] = useState("PNG"),
        [fileName, setFileName] = useState("download"),
        // we store the project when the save dialog is shown
        // because using db.projects.get will force the user
        // to click twice on save button and will not update
        // the user's settings
        [projectToSave, setProjectToSave] = useState<Project | null>(null);

    let downloadLink = useRef<HTMLAnchorElement>(null);
    let activeProject = useSelector(
        (state: RootState) => state.userInterface.activeProject
    );

    let i18n = State.getObject("translationContext");

    useEffect(() => {
        db.projects.get(activeProject).then((project) => {
            if (project !== undefined) {
                setProjectToSave(project);
            }
        });
    }, [activeProject]);

    function saveImage() {
        if (projectToSave !== null && downloadLink.current !== null) {
            // temporary currentData[0]
            let imageData = new ImageData(
                projectToSave.currentData[0].data,
                projectToSave.width,
                projectToSave.height
            );
            downloadPhotoFromImageData(
                imageData,
                qualityValue,
                fileFormat,
                fileName,
                downloadLink.current
            );
        }
    }

    return (
        <Dialog open={true} onClose={props.closeEvent}>
            <DialogTitle>Save photo options</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ fontSize: "14px" }}>
                    If you press &quot;Save&quot;, the photo will be downloaded
                    to the browser&apos;s default download location
                </DialogContentText>
                <div>
                    <InputLabel id="fileFormat">
                        {i18n("common:saveAs")}
                    </InputLabel>
                    <Select
                        labelId="fileFormat"
                        value={fileFormat}
                        label={"Format"}
                        onChange={(e) => {
                            setFileFormat(e.target.value);
                        }}
                    >
                        <MenuItem value={"PNG"}>PNG</MenuItem>
                        <MenuItem value={"JPG"}>JPG/JPEG</MenuItem>
                        <MenuItem value={"WEBP"}>WebP</MenuItem>
                    </Select>
                </div>

                <div>
                    <p>{i18n("common:quality")}</p>
                    <div className="centerAlign">
                        <Slider
                            disabled={
                                fileFormat !== "JPG" && fileFormat !== "WEBP"
                            }
                            sx={{ marginRight: "20px" }}
                            value={
                                typeof qualityValue === "number"
                                    ? qualityValue
                                    : 0
                            }
                            onChange={(e) => {
                                //@ts-ignore
                                setQualityValue(e.target.value);
                            }}
                        />
                        <Input
                            disabled={
                                fileFormat !== "JPG" && fileFormat !== "WEBP"
                            }
                            value={qualityValue}
                            size="small"
                            onChange={(e) =>
                                setQualityValue(parseInt(e.target.value))
                            }
                            inputProps={{
                                step: 1,
                                min: 0,
                                max: 100,
                                type: "number"
                            }}
                        />
                    </div>
                </div>

                <TextField
                    margin="dense"
                    id="name"
                    label={i18n("common:imgName")}
                    type="text"
                    value={fileName}
                    fullWidth
                    variant="standard"
                    onChange={(e) => {
                        setFileName(e.target.value);
                    }}
                />

                <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                        setFileName(uuid());
                    }}
                >
                    {i18n("common:generateRandomName")}
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.closeEvent}>
                    {i18n("common:cancel")}
                </Button>
                <Button
                    onClick={() => {
                        saveImage();
                    }}
                    variant="contained"
                >
                    <a style={{ color: "#000" }} ref={downloadLink}>
                        {i18n("common:save")}
                    </a>
                </Button>
            </DialogActions>
        </Dialog>
    );
}
