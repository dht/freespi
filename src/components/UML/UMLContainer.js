import React from "react";
import { connect } from "react-redux";
import UML from "./UML";
import * as thunks from "../../reducers/app_thunks";
import { ignoreListSelector } from "../../selectors/selectors";
import * as selectors from "../../selectors/selectors";
import { getLogs } from "../../utils/logs";

const mapStateToProps = (state, ownProps) => {
    const logs = getLogs();

    return {
        logs: logs.logs,
        maxRun: logs.maxRun,
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        generateIO: (name, params) => {
            return dispatch(thunks.generateIO(name, params));
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UML);
