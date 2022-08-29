import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../src/redux/global.store";
import ToolOptionsBase from "../../UI/ToolOptionsBase";

function MoveTool(props: { i18n: any }) {
    let isToolOptionsMenuActive = useSelector(
        (state: RootState) => state.toolOptions.isActive
    );

    let i18n = props.i18n;

    return (
        <ToolOptionsBase
            active={isToolOptionsMenuActive}
            title={i18n("edit:toolOptions.moveTool.title")}
        >
            <div>{i18n("common:notFunctional")}</div>
        </ToolOptionsBase>
    );
}

export default MoveTool;
